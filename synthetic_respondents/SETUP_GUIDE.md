# Setup Guide - Step by Step

## Step 1: Configure Ollama Model Name

Before starting, you need to update the model name to match your local Ollama setup.

1. Check your available models:
```bash
ollama list
```

2. Open [backend/config.py](backend/config.py) and find line 11:
```python
MODEL_NAME = "gpt-oss:20b"  # <-- CHANGE THIS
```

3. Replace `"gpt-oss:20b"` with your actual model name from the list

Common model names:
- `"llama2:13b"`
- `"mistral:latest"`
- `"codellama:7b"`
- Or whatever your GPT OSS 20B model is named

**Note:** All configuration (model, temperature, timeouts) is now in [backend/config.py](backend/config.py)

## Step 2: Install Backend Dependencies

```bash
# Make sure you're in the project root
cd /Users/mshinde/Desktop/Personal/agentic/synthetic_respondents

# Install Python packages
pip install -r requirements.txt
```

## Step 3: Install Frontend Dependencies

```bash
# Still in project root
npm install
```

## Step 4: Start Ollama (if not running)

```bash
# In a new terminal
ollama serve
```

Leave this running in the background.

## Step 5: Start the Backend Server

```bash
# In a new terminal, from project root
cd backend
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Leave this running.

## Step 6: Start the Frontend

```bash
# In another new terminal, from project root
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## Step 7: Open Your Browser

Navigate to: http://localhost:5173

You should see the Synthetic Respondents interface!

## Testing the Setup

1. **Check Ollama connection**:
   - Visit http://localhost:8000/health
   - Should show: `{"status":"healthy","ollama":"connected"}`

2. **Test persona generation**:
   - In the UI, keep the default audience settings
   - Click "Generate Synthetic Participants"
   - Wait for personas to appear (may take 30-60 seconds depending on your model)

## Troubleshooting

### "Ollama error" or connection refused
- Make sure `ollama serve` is running
- Check the model name matches exactly (case-sensitive)
- Test manually: `curl http://localhost:11434/api/tags`

### Frontend can't connect to backend
- Make sure backend is running on port 8000
- Check for CORS errors in browser console
- Verify http://localhost:8000 is accessible

### Slow responses
- This is normal with large models
- First request is always slower (model loading)
- Try reducing respondent count to 3 for testing

### JSON parsing errors
- Some models struggle with JSON formatting
- Try adjusting the temperature (lower = more consistent)
- Consider using a different model better trained on structured output

## Customizing Prompts

All prompts are in `backend/main.py`:

1. **Line ~70**: Persona generation prompt
2. **Line ~220**: Interview response prompt
3. **Line ~260**: Summary analysis prompt

Just edit the prompt strings and restart the backend server.

## Quick Restart Commands

When you make changes:

**Backend changes**:
```bash
# Ctrl+C in backend terminal, then:
python main.py
```

**Frontend changes**:
```bash
# Ctrl+C in frontend terminal, then:
npm run dev
```

**Prompt changes**:
- Only need to restart backend
- Frontend will automatically use new prompts

## What's Next?

Once everything is working:

1. Try different audience definitions
2. Modify the interview questions
3. Tweak prompts to get better responses
4. Adjust the concept description

Have fun testing! 🚀
