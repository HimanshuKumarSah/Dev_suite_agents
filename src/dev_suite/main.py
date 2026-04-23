#!/usr/bin/env python
import sys
import warnings
from datetime import datetime
from dotenv import load_dotenv
from dev_suite.crew import DevSuite

# Load environment variables from .env file
load_dotenv()

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

def run():
    """
    Run the crew.
    """
    if len(sys.argv) < 2:
        print("Usage: uv run dev_suite <srs_file_path> [llm_choice]")
        print("Available llm_choice: ollama (default), openai, gemini")
        sys.exit(1)
        
    srs_file_path = sys.argv[1]
    
    # Optional LLM choice from command line
    llm_choice = sys.argv[2] if len(sys.argv) > 2 else "ollama"
    
    inputs = {
        'srs_file_path': srs_file_path,
        'current_year': str(datetime.now().year)
    }

    try:
        # Initialize with chosen LLM
        result = DevSuite(llm_choice=llm_choice).crew().kickoff(inputs=inputs)
        print("\n\n########################")
        print("## Crew Execution Result")
        print("########################\n")
        print(result)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

if __name__ == "__main__":
    run()
