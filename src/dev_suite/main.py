#!/usr/bin/env python
import sys
import warnings
from datetime import datetime
from dev_suite.crew import DevSuite

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

def run():
    """
    Run the crew.
    """
    if len(sys.argv) < 2:
        print("Usage: uv run dev_suite <srs_file_path>")
        sys.exit(1)
        
    srs_file_path = sys.argv[1]
    
    inputs = {
        'srs_file_path': srs_file_path,
        'current_year': str(datetime.now().year)
    }

    try:
        result = DevSuite().crew().kickoff(inputs=inputs)
        print("\n\n########################")
        print("## Crew Execution Result")
        print("########################\n")
        print(result)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

if __name__ == "__main__":
    run()
