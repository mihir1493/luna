# 🚀 START HERE - Your Synthetic Respondents MVP

## ✅ What's Been Built

Your Phase 1 MVP is complete! Here's what you have:

### Core Components

1. **Backend API** ([backend/main.py](backend/main.py))
   - FastAPI server (200 lines, clean and simple)
   - 3 endpoints: generate personas, run study, health check
   - Connects to your local Ollama

2. **Prompts** ([backend/prompts.py](backend/prompts.py))
   - All AI prompts in one file - easy to tweak!
   - Persona generation prompt
   - Interview response prompt
   - Summary analysis prompt

3. **Configuration** ([backend/config.py](backend/config.py))
   - **⚠️ EDIT THIS FIRST** - Set your Ollama model name
   - Temperature settings
   - Timeouts and other options

4. **Frontend UI** ([src/SyntheticRespondentsTool.jsx](src/SyntheticRespondentsTool.jsx))
   - Beautiful React interface
   - 5-step workflow
   - Real-time results

## 🏃 Quick Start (3 Commands)

```bash
# 1. Configure your model name
# Edit backend/config.py line 11 - change "gpt-oss:20b" to your model

# 2. Install dependencies
pip install -r requirements.txt && npm install

# 3. Run (in 3 separate terminals)
ollama serve                    # Terminal 1
cd backend && python main.py    # Terminal 2
npm run dev                     # Terminal 3

# 4. Open http://localhost:5173
```

## 📁 Project Structure

```
synthetic_respondents/
├── backend/
│   ├── config.py         # ⭐ CONFIGURE YOUR MODEL HERE
│   ├── prompts.py        # ⭐ CUSTOMIZE PROMPTS HERE
│   └── main.py           # API server (don't need to edit)
├── src/
│   ├── SyntheticRespondentsTool.jsx  # UI component
│   ├── main.jsx
│   └── index.css
├── START_HERE.md         # ⭐ This file
├── QUICK_START.md        # Quick reference
├── SETUP_GUIDE.md        # Step-by-step setup
└── README.md             # Full documentation
```

## 🎯 What It Does

1. **Define Audience** → Describe your target market
2. **Generate Personas** → AI creates realistic respondents
3. **Input Concept** → Describe your product
4. **Run Interviews** → AI conducts interviews as each persona
5. **View Results** → Get individual responses + executive summary

## ⚙️ First-Time Setup

### 1. Configure Your Model

Open [backend/config.py](backend/config.py):

```python
MODEL_NAME = "gpt-oss:20b"  # <-- Change to your actual model name
```

Check available models:
```bash
ollama list
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
npm install
```

### 3. Start Everything

**Terminal 1 - Ollama:**
```bash
ollama serve
```

**Terminal 2 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 3 - Frontend:**
```bash
npm run dev
```

### 4. Test It

1. Open http://localhost:5173
2. Use default settings (or customize audience)
3. Click "Generate Synthetic Participants"
4. Wait ~30 seconds
5. Review personas, continue through steps
6. Run the concept test
7. View results!

## 🎨 Customization

### Easy Customizations (No coding!)

1. **Change your model** → Edit [backend/config.py](backend/config.py)
2. **Tweak AI behavior** → Edit [backend/prompts.py](backend/prompts.py)
3. **Adjust temperature** → Edit [backend/config.py](backend/config.py)

### Prompt Customization Examples

**Make personas more diverse:**
Edit [backend/prompts.py](backend/prompts.py:20), add:
```python
- Include diverse ethnic backgrounds
- Vary income levels more widely
- Add rural and urban mix
```

**Change response style:**
Edit [backend/prompts.py](backend/prompts.py:60), modify:
```python
# Make more casual:
- Use more slang and informal language
- Include more filler words
- Be more conversational
```

**Add new metrics:**
Edit [backend/prompts.py](backend/prompts.py:120), add:
```python
7. **novelty_score**: How new/innovative the product feels (1-10)
8. **shareability**: Likelihood to recommend to friends (%)
```

## 🐛 Troubleshooting

### "Ollama error" or connection refused
```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# If not, start it
ollama serve
```

### "Model not found"
```bash
# List your models
ollama list

# Update backend/config.py with exact name
```

### Slow responses
- Normal with large models!
- First request loads the model (slowest)
- Try 3 personas instead of 5 for testing

### JSON parsing errors
- Lower temperature in config.py (try 0.5)
- Some models better at JSON than others
- Fallback summary will be used automatically

## 📚 Documentation

- [START_HERE.md](START_HERE.md) - This file
- [QUICK_START.md](QUICK_START.md) - Quick reference guide
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed step-by-step
- [README.md](README.md) - Complete documentation

## 🎯 What's NOT Included (Phase 2+)

Per your architecture doc, Phase 1 is intentionally simple:

- ❌ No CrewAI (not needed for MVP)
- ❌ No database (stateless for now)
- ❌ No deep personas (basic attributes only)
- ❌ No speech patterns (can add later)
- ❌ No focus groups (individual only)

These can be added in future phases!

## ✨ Key Features

✅ **Simple & Clean** - Only ~400 lines of code total
✅ **Easy to Customize** - All prompts in one file
✅ **Local-First** - Your data never leaves your machine
✅ **No Dependencies** - No complex frameworks, just FastAPI + React
✅ **Fast Iteration** - Change prompts, restart backend, test immediately

## 🚀 Ready to Go!

1. Edit [backend/config.py](backend/config.py) with your model name
2. Run the 3 commands above
3. Open http://localhost:5173
4. Start testing concepts!

Have fun! 🎉
