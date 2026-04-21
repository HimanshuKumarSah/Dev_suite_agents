import os
import subprocess
from crewai.tools import tool

@tool("Setup Nginx for React")
def setup_nginx_for_react(port: str = "8080") -> str:
    """
    Useful to set up an Nginx configuration for a React single-page application.
    The input should be the port number to run Nginx on (default is 8080).
    It creates an nginx.conf and a placeholder dist/index.html in the current directory.
    """
    # Adjust this path based on where your agent is running relative to the script
    script_path = os.path.join(os.getcwd(), "nginx-react-setup.sh")
    
    # Ensure the script exists
    if not os.path.exists(script_path):
        return f"Error: Setup script {script_path} not found. Please ensure it is in the correct location."
    
    try:
        # Run the bash script
        result = subprocess.run(
            [script_path, str(port)], 
            capture_output=True, 
            text=True, 
            check=True
        )
        return f"Success! Nginx setup complete.\n{result.stdout}"
    except subprocess.CalledProcessError as e:
        return f"Failed to run setup script. Error:\n{e.stderr}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"
