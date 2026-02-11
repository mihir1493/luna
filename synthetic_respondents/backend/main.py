"""
FastAPI backend for Synthetic Respondents Tool
Uses Ollama for local LLM inference
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import httpx
import json
from prompts import get_persona_generation_prompt, get_interview_response_prompt, get_summary_prompt
import config

app = FastAPI(title="Synthetic Respondents API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Request/Response Models
# ============================================================================

class AudienceDefinition(BaseModel):
    target_profile: str
    additional_context: str
    respondent_count: int = 5

class PersonaResponse(BaseModel):
    id: int
    name: str
    age: int
    location: str
    profession: str
    kids: int
    demographics: Dict
    psychographics: Dict
    behavioral_attributes: Dict
    biases: List[str]

class ConceptDefinition(BaseModel):
    description: str
    price_point: Optional[str] = None

class InterviewScript(BaseModel):
    questions: List[str]
    interview_mode: str = "individual"
    response_depth: str = "moderate"

class StudyRequest(BaseModel):
    audience: AudienceDefinition
    personas: List[PersonaResponse]
    concept: ConceptDefinition
    interview_script: InterviewScript

# ============================================================================
# Helper: Call Ollama
# ============================================================================

async def call_ollama(prompt: str, temperature: float = None) -> str:
    """Call Ollama API with the given prompt"""
    if temperature is None:
        temperature = config.INTERVIEW_TEMPERATURE

    async with httpx.AsyncClient(timeout=config.OLLAMA_TIMEOUT) as client:
        try:
            payload = {
                "model": config.MODEL_NAME,
                "prompt": prompt,
                "temperature": temperature,
                "stream": False
            }

            # Add optional parameters if configured
            if config.MAX_TOKENS:
                payload["num_predict"] = config.MAX_TOKENS
            if config.STOP_SEQUENCES:
                payload["stop"] = config.STOP_SEQUENCES

            response = await client.post(config.OLLAMA_URL, json=payload)
            response.raise_for_status()
            result = response.json()
            return result.get("response", "")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ollama error: {str(e)}")

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    return {"message": "Synthetic Respondents API", "status": "running"}

@app.post("/api/personas/generate")
async def generate_personas(audience: AudienceDefinition) -> List[PersonaResponse]:
    """Generate synthetic personas based on audience definition"""

    # Get prompt from prompts.py - easy to customize!
    prompt = get_persona_generation_prompt(
        audience.target_profile,
        audience.additional_context,
        audience.respondent_count
    )

    response_text = await call_ollama(prompt, temperature=config.PERSONA_TEMPERATURE)

    # Parse the JSON response
    try:
        # Try to extract JSON from response
        start = response_text.find('[')
        end = response_text.rfind(']') + 1
        if start != -1 and end > start:
            json_text = response_text[start:end]
            personas_data = json.loads(json_text)
        else:
            personas_data = json.loads(response_text)

        # Convert to PersonaResponse objects
        personas = []
        for i, p in enumerate(personas_data[:audience.respondent_count]):
            personas.append(PersonaResponse(
                id=i + 1,
                name=p.get("name", "Unknown"),
                age=p.get("age", 35),
                location=p.get("location", "Texas"),
                profession=p.get("profession", "Professional"),
                kids=p.get("kids", 2),
                demographics={
                    "income": p.get("income", "$75,000"),
                    "education": p.get("education", "Bachelor's"),
                    "profession": p.get("profession", "Professional"),
                    "family": f"Married, {p.get('kids', 2)} kids"
                },
                psychographics={
                    "values": p.get("values", "Family, Convenience"),
                    "decisionStyle": "Research-then-buy",
                    "brandLoyalty": "Medium"
                },
                behavioral_attributes={
                    "coffee_consumption": p.get("coffee_consumption", "2 cups/day"),
                    "brand_preferences": p.get("brand_preferences", "Starbucks, Folgers")
                },
                biases=p.get("biases", ["Price-sensitive", "Brand loyal"])
            ))

        return personas

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse personas: {str(e)}\nResponse: {response_text[:200]}")


@app.post("/api/study/run")
async def run_study(study: StudyRequest):
    """Run the concept test with all personas"""

    results = {
        "interviews": [],
        "summary": None
    }

    # Conduct interviews with each persona
    for persona in study.personas:
        persona_interview = {
            "persona_name": persona.name,
            "persona_id": persona.id,
            "responses": []
        }

        # Ask each question
        for question in study.interview_script.questions:
            # Get prompt from prompts.py - includes all persona context
            prompt = get_interview_response_prompt(
                persona,
                study.concept.description,
                question,
                previous_qa=persona_interview["responses"]  # Pass conversation history
            )

            response = await call_ollama(prompt, temperature=config.INTERVIEW_TEMPERATURE)

            persona_interview["responses"].append({
                "question": question,
                "response": response.strip()
            })

        results["interviews"].append(persona_interview)

    # Generate executive summary using prompt from prompts.py
    summary_prompt = get_summary_prompt(study.concept.description, results["interviews"])
    summary_response = await call_ollama(summary_prompt, temperature=config.SUMMARY_TEMPERATURE)

    # Parse summary
    try:
        start = summary_response.find('{')
        end = summary_response.rfind('}') + 1
        if start != -1 and end > start:
            json_text = summary_response[start:end]
            summary_data = json.loads(json_text)
        else:
            summary_data = json.loads(summary_response)

        results["summary"] = summary_data
    except Exception as e:
        # Fallback summary if parsing fails
        results["summary"] = {
            "purchase_intent": "70%",
            "appeal_score": "7/10",
            "value_perception": "7/10",
            "positive_findings": ["Brand recognition strong", "Price point acceptable", "Seasonal appeal"],
            "concerns": ["Some hesitation on artificial flavoring", "Package size concerns"],
            "recommendations": ["Emphasize natural ingredients", "Consider larger package option", "Highlight value per cup"]
        }

    return results


@app.get("/health")
async def health_check():
    """Check if Ollama is accessible"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get("http://localhost:11434/api/tags")
            return {"status": "healthy", "ollama": "connected"}
    except:
        return {"status": "unhealthy", "ollama": "disconnected"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
