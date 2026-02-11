# Quick Start - Get Running in 5 Minutes

## TL;DR

```bash
# 1. Update model name in backend/main.py line 15
# 2. Install & run
pip install -r requirements.txt
npm install

# 3. Start (3 terminals)
# Terminal 1:
ollama serve

# Terminal 2:
cd backend && python main.py

# Terminal 3:
npm run dev

# 4. Open http://localhost:5173
```

## What You Built

A simple MVP for Phase 1 with:

✅ **Backend** ([backend/main.py](backend/main.py))
- FastAPI server connecting to local Ollama
- 3 main endpoints: generate personas, run study, health check
- All prompts extracted to [backend/prompts.py](backend/prompts.py) for easy tweaking

✅ **Frontend** ([src/SyntheticRespondentsTool.jsx](src/SyntheticRespondentsTool.jsx))
- React UI with 5-step workflow
- Connects to backend via fetch API
- Real-time updates as study runs

✅ **Core Features**
- Define target audience
- Generate realistic personas with AI
- Input product concept
- Create interview questions
- Get individual responses + executive summary

## Project Structure

```
synthetic_respondents/
├── backend/
│   ├── main.py           # FastAPI server (150 lines)
│   └── prompts.py        # All prompts - EDIT THIS to customize
├── src/
│   ├── SyntheticRespondentsTool.jsx  # Main UI component
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind styles
├── index.html
├── package.json
├── requirements.txt
├── vite.config.js
├── tailwind.config.js
├── README.md             # Full documentation
├── SETUP_GUIDE.md        # Step-by-step setup
└── QUICK_START.md        # This file
```

## Customizing Prompts

All prompts are in [backend/prompts.py](backend/prompts.py):

1. **`get_persona_generation_prompt()`** - How personas are created
   - Add/remove attributes
   - Change demographic focus
   - Adjust diversity

2. **`get_interview_response_prompt()`** - How personas respond
   - Modify tone and style
   - Adjust response length
   - Add speech patterns

3. **`get_summary_prompt()`** - How results are analyzed
   - Change metrics
   - Add new insights
   - Modify recommendations format

Just edit the strings and restart the backend!

## Key Design Decisions

**Why this architecture?**
- ✅ Simple - only 2 files of actual logic
- ✅ No database - stateless for MVP
- ✅ Local-first - all processing on your machine
- ✅ Easy prompts - plain text, no complex frameworks
- ✅ No CrewAI - not needed for Phase 1, can add later

**What's missing (intentionally)?**
- ❌ No database persistence
- ❌ No deep persona attributes (50+)
- ❌ No speech pattern matching
- ❌ No focus group mode
- ❌ No CrewAI multi-agent (not needed yet)

These are Phase 2+ features per the architecture doc.

## Testing Your Setup

1. **Generate 3 personas** for "30-40 year old mothers"
2. **Use default concept** (Starbucks K-cups)
3. **Run with 3-4 questions** to test quickly
4. **Check results** - you should get realistic responses

If it works, you're ready to start testing real concepts!

## Common Issues

**Slow responses?**
- Normal with large models
- Try fewer personas (3 instead of 8)
- Use fewer questions initially

**JSON parsing errors?**
- Some models struggle with JSON
- Try lowering temperature in prompts.py
- Or use a model better at structured output

**Need to change model?**
Edit [backend/main.py](backend/main.py:15):
```python
MODEL_NAME = "your-model-name"
```

## What's Next?

1. ✅ Test with your own product concepts
2. ✅ Tweak prompts to improve responses
3. ✅ Adjust interview questions for your domain
4. ✅ Experiment with different audiences

Later (Phase 2):
- Add CrewAI for multi-agent personas
- Implement deeper persona attributes
- Add speech pattern matching
- Database for saving studies

## Support

- Full docs: [README.md](README.md)
- Setup help: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Prompts reference: [backend/prompts.py](backend/prompts.py)

Happy testing! 🚀
