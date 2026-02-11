"""
Configuration file for Ollama connection
EDIT THIS FILE to change your model and settings
"""

# ============================================================================
# OLLAMA CONFIGURATION - CHANGE THIS!
# ============================================================================

# Your Ollama model name
# Check available models: ollama list
# Common options: "llama2:13b", "mistral:latest", "codellama:7b"
MODEL_NAME = "gpt-oss:20b"  # <-- CHANGE THIS to your actual model name

# Ollama API endpoint
OLLAMA_URL = "http://localhost:11434/api/generate"

# ============================================================================
# TEMPERATURE SETTINGS
# ============================================================================

# Temperature for persona generation (higher = more creative/diverse)
# Range: 0.0 (deterministic) to 1.0 (very creative)
PERSONA_TEMPERATURE = 0.8

# Temperature for interview responses (higher = more varied responses)
INTERVIEW_TEMPERATURE = 0.8

# Temperature for summary generation (lower = more consistent analysis)
SUMMARY_TEMPERATURE = 0.5

# ============================================================================
# TIMEOUT SETTINGS
# ============================================================================

# How long to wait for Ollama responses (seconds)
# Large models may need more time
OLLAMA_TIMEOUT = 120.0

# ============================================================================
# ADVANCED SETTINGS (usually don't need to change)
# ============================================================================

# Maximum tokens in response (if your model supports it)
# Set to None to use model defaults
MAX_TOKENS = None

# Stop sequences (if your model supports it)
STOP_SEQUENCES = None

# Number of retries if Ollama connection fails
MAX_RETRIES = 3
