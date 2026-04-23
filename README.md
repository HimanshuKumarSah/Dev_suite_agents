# DevSuite Crew - AI-Driven App Development

DevSuite is a multi-agent system powered by [crewAI](https://crewai.com) designed to autonomously transform Software Requirements Specifications (SRS) into functional applications. It leverages specialized agents for analysis, development, DevOps, and QA.

## Features

- **SRS Analysis:** Automatically parses and extracts requirements from PDF documents.
- **Full-Stack Development:** Generates backend and frontend code based on requirements.
- **DevOps Automation:** Configures Nginx for React application deployment.
- **Automated QA:** Validates the generated project against the original SRS.
- **Multi-LLM Support:** Choose between local (Ollama) or cloud (OpenAI, Gemini) models.
- **Parallel Execution:** Run multiple instances with different models or projects simultaneously.

## Installation

This project uses [UV](https://docs.astral.sh/uv/) for high-performance dependency management.

1. **Install UV:**
   ```bash
   pip install uv
   ```

2. **Sync Dependencies:**
   ```bash
   uv sync
   ```

## Configuration

1. **Environment Variables:**
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your API keys if using cloud providers (OpenAI/Gemini).

2. **Local LLM (Ollama):**
   Ensure Ollama is running locally with your desired model (default: `llama3.1`).

## Running the Project

Launch the crew by specifying the path to your SRS PDF and an optional LLM choice:

```bash
# Default (Uses Ollama)
uv run dev_suite path/to/your_srs.pdf

# Using OpenAI (Requires OPENAI_API_KEY in .env)
uv run dev_suite path/to/your_srs.pdf openai

# Using Google Gemini (Requires GOOGLE_API_KEY in .env)
uv run dev_suite path/to/your_srs.pdf gemini
```

### Multi-Instance Usage
You can run multiple instances in parallel by opening separate terminals. This is ideal for benchmarking different models or processing multiple project pipelines at once.

## Project Structure

- `src/dev_suite/config/`: YAML files defining agent personas and task workflows.
- `src/dev_suite/tools/`: Custom Python tools for PDF reading and Nginx setup.
- `src/dev_suite/crew.py`: Core logic for agent orchestration and LLM configuration.
- `src/dev_suite/main.py`: Entry point for command-line execution and environment loading.
- `knowledge/`: Local knowledge base files for agent grounding.

## Support

- Visit [crewAI Documentation](https://docs.crewai.com)
- Join the [CrewAI's Discord Community](https://discord.com/invite/X4JWnZnxPb)
