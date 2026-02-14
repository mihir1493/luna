# Synthetic Respondents Tool - MVP (Phase 1)

View Tool: [link](https://docs.google.com/presentation/d/1AEOnWCp1SUmxqYeutLMqBjnW-zk7iSkgrjuTZdfw06E/edit?usp=sharing)

A simple CPG concept testing platform using AI-generated personas powered by local Ollama.

## Prerequisites

1. **Ollama installed and running**
   - Install from: https://ollama.ai
   - Pull your GPT OSS 20B model: `ollama pull <your-model-name>`
   - Update `MODEL_NAME` in `backend/main.py` to match your model

2. **Python 3.8+**

3. **Node.js 16+** (for React frontend)

## Quick Start

### 1. Start Ollama

Make sure Ollama is running:
```bash
ollama serve
```

Verify your model is available:
```bash
ollama list
```

### 2. Start Backend

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
cd backend
python main.py
```

The API will run at http://localhost:8000

### 3. Start Frontend

```bash
# Install Node dependencies
npm install

# Start the development server
npm run dev
```

The UI will run at http://localhost:5173 (or 3000 depending on your setup)

## How It Works

### Phase 1 Features

1. **Audience Definition** - Define your target audience with simple text descriptions
2. **Persona Generation** - AI generates realistic personas with demographics, psychographics, and biases
3. **Concept Input** - Describe your product concept
4. **Interview Script** - Define questions to ask your synthetic respondents
5. **Results** - View individual interview responses and an executive summary

### Architecture

```
┌─────────────┐
│   React UI  │ (Frontend - Port 5173/3000)
└──────┬──────┘
       │
       │ HTTP REST API
       │
┌──────▼──────┐
│  FastAPI    │ (Backend - Port 8000)
└──────┬──────┘
       │
       │ HTTP API calls
       │
┌──────▼──────┐
│   Ollama    │ (Local LLM - Port 11434)
└─────────────┘
```

### Customizing Prompts

All prompts are in [backend/main.py](backend/main.py) and are designed to be simple and easy to tweak:

- **Persona Generation Prompt** (line ~70): Adjust to change what attributes are generated
- **Interview Response Prompt** (line ~220): Modify to change how personas respond
- **Summary Prompt** (line ~260): Customize the analysis format

Example customization:
```python
# In backend/main.py, find the persona generation prompt and modify:
prompt = f"""Generate {audience.respondent_count} realistic personas...

# Add your custom instructions here
- Focus on coffee enthusiasts
- Include sustainability concerns
- Add price sensitivity levels

..."""
```

## API Endpoints

- `GET /` - Health check
- `POST /api/personas/generate` - Generate synthetic personas
- `POST /api/study/run` - Run full concept test
- `GET /health` - Check Ollama connection

## Configuration

### Change Ollama Model

Edit [backend/main.py](backend/main.py:15):
```python
MODEL_NAME = "your-model-name"  # Change this to your model
```

### Adjust Response Temperature

In [backend/main.py](backend/main.py:56), modify:
```python
temperature: float = 0.7  # Lower = more consistent, Higher = more creative
```

## Troubleshooting

### Ollama Connection Error
- Ensure Ollama is running: `ollama serve`
- Check it's accessible: `curl http://localhost:11434/api/tags`

### Model Not Found
- List available models: `ollama list`
- Pull your model if needed: `ollama pull <model-name>`
- Update `MODEL_NAME` in backend/main.py

### CORS Errors
- Make sure the frontend URL is in the CORS allow list in backend/main.py
- Default allows localhost:3000 and localhost:5173

### Slow Responses
- This is expected with large models
- Consider using a smaller/faster model for testing
- Reduce the number of personas or questions

## Next Steps (Future Phases)

Phase 2 would add:
- Deeper persona attributes (50+ attributes)
- Speech pattern matching
- Bias injection system
- Database persistence

Phase 3:
- Focus group simulation
- Image concept testing
- Advanced analytics

## File Structure

```
synthetic_respondents/
├── backend/
│   └── main.py              # FastAPI backend with all logic
├── src/
│   └── SyntheticRespondentsTool.jsx  # React UI component
├── requirements.txt         # Python dependencies
├── package.json            # Node dependencies
└── README.md               # This file
```

## Notes

- All processing happens locally - no data sent to external APIs
- Prompts are intentionally simple for easy customization
- This is an MVP - focus is on functionality, not optimization
- Responses will vary based on your model's capabilities
