"""
Customizable prompts for the Synthetic Respondents Tool
Edit these to change how personas are generated and how they respond
"""

def get_persona_generation_prompt(audience_definition, additional_context, count):
    """
    Prompt for generating synthetic personas

    CUSTOMIZATION TIPS:
    - Add more attributes to the JSON schema
    - Adjust the tone and style
    - Add specific domain requirements
    - Change demographic distributions
    """
    return f"""Generate {count} realistic personas for market research.

Target Audience: {audience_definition}
Additional Context: {additional_context}

For each persona, create a JSON object with:
- name (first and last name, realistic for the demographic)
- age (number within target range)
- location (city, state)
- profession (realistic job title)
- kids (number of children)
- income (household income as string like "$72,000")
- education (education level: High School, Associate's, Bachelor's, Master's, PhD)
- values (2-3 core values as comma-separated string)
- coffee_consumption (cups per day as string like "2-3 cups/day")
- brand_preferences (2-3 coffee brands as comma-separated string)
- biases (2-3 specific behavioral biases or quirks as array of strings)

IMPORTANT:
- Make personas diverse but realistic for the target audience
- Include natural variation in attributes
- Biases should be specific and behavioral (e.g., "Skeptical of unfamiliar brands", "Influenced by online reviews")
- Return ONLY a valid JSON array of {count} persona objects
- No markdown formatting, no extra text, just pure JSON

Example format:
[
  {{
    "name": "Sarah Martinez",
    "age": 34,
    "location": "Austin, TX",
    "profession": "Elementary Teacher",
    "kids": 2,
    "income": "$72,000",
    "education": "Bachelor's",
    "values": "Family, Convenience, Quality",
    "coffee_consumption": "2-3 cups/day",
    "brand_preferences": "Starbucks, Folgers, Dunkin",
    "biases": ["Price-sensitive but willing to splurge", "Influenced by mom friends", "Skeptical of too-good deals"]
  }}
]
"""


def get_interview_response_prompt(persona, concept, question, previous_qa=None):
    """
    Prompt for generating interview responses

    CUSTOMIZATION TIPS:
    - Adjust response length guidance
    - Change the tone (more formal, more casual, etc.)
    - Add specific speech patterns
    - Include regional dialect instructions
    - Modify bias emphasis
    """

    # Build context from previous Q&A if available
    context = ""
    if previous_qa:
        context = "\n\nPrevious conversation:\n"
        for qa in previous_qa[-3:]:  # Last 3 exchanges for context
            context += f"Q: {qa['question']}\nYour answer: {qa['response']}\n"

    return f"""You are {persona.name}, a {persona.age}-year-old {persona.profession} from {persona.location}.

YOUR PROFILE:
- Income: {persona.demographics.get('income')}
- Education: {persona.demographics.get('education')}
- Family: {persona.demographics.get('family')}
- Values: {persona.psychographics.get('values')}
- Coffee habits: {persona.behavioral_attributes.get('coffee_consumption')}
- Preferred brands: {persona.behavioral_attributes.get('brand_preferences')}
- Your behavioral biases: {', '.join(persona.biases)}

PRODUCT CONCEPT YOU'RE BEING SHOWN:
{concept}
{context}

CURRENT QUESTION:
{question}

INSTRUCTIONS:
- Respond as {persona.name} would naturally respond
- Use vocabulary appropriate to your education level ({persona.demographics.get('education')})
- Let your biases influence your answer (e.g., if you're price-sensitive, mention value)
- Be authentic - show hesitation ("hmm", "I'm not sure"), enthusiasm, or skepticism as appropriate
- Keep response conversational and realistic (2-4 sentences typically)
- Reference your actual life when relevant (kids, job, morning routine, etc.)
- Don't be overly helpful or agreeable - real people have doubts and objections
- Use natural speech patterns - incomplete thoughts, filler words, tangents are okay

Respond in first person ONLY as {persona.name}. No quotes around your response, just speak naturally:"""


def get_summary_prompt(concept, interviews):
    """
    Prompt for generating executive summary

    CUSTOMIZATION TIPS:
    - Add more metrics to analyze
    - Change the scoring scales
    - Modify what insights to extract
    - Adjust recommendation format
    """

    # Build interview text
    interview_text = ""
    for interview in interviews:
        interview_text += f"\n{interview['persona_name']}:\n"
        for resp in interview["responses"]:
            interview_text += f"Q: {resp['question']}\nA: {resp['response']}\n\n"

    return f"""Analyze these market research interviews for the following product:

PRODUCT CONCEPT:
{concept}

INTERVIEW DATA:
{interview_text}

Based on these interviews, provide an analysis with:

1. **purchase_intent**: Estimated percentage likely to buy (as string like "75%")
   - Calculate based on explicit purchase statements and enthusiasm levels

2. **appeal_score**: Overall appeal rating as string (like "7.5/10")
   - Based on positive vs negative reactions

3. **value_perception**: How good the value is perceived as string (like "6.8/10")
   - Based on price comments and value-for-money mentions

4. **positive_findings**: Array of 3 key positive insights (strings)
   - What resonates well with respondents
   - Brand equity, price points, convenience factors, etc.

5. **concerns**: Array of 2-3 key concerns or warnings (strings)
   - What makes them hesitate
   - Common objections or barriers

6. **recommendations**: Array of 3 actionable recommendations (strings)
   - Specific suggestions to improve the concept
   - Based on the interview feedback

FORMAT AS JSON:
{{
  "purchase_intent": "XX%",
  "appeal_score": "X.X/10",
  "value_perception": "X.X/10",
  "positive_findings": ["finding 1", "finding 2", "finding 3"],
  "concerns": ["concern 1", "concern 2"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}}

Return ONLY valid JSON, no markdown, no extra text.
"""
