# Nginx React Setup Context for CrewAI

This document contains the context and necessary scripts to implement an Nginx configuration agent within your existing CrewAI setup.

## 1. The Core Setup Script (`nginx-react-setup.sh`)

This bash script handles the actual configuration. Your CrewAI agent will execute this script as a tool. Ensure this script is executable (`chmod +x nginx-react-setup.sh`) in the environment where your agent runs.

```bash
#!/bin/bash

# Default port
PORT=\${1:-8080}
PROJECT_DIR=\$(pwd)
DIST_DIR="\$PROJECT_DIR/dist"

echo "🤖 Setting up Nginx for React Project in: \$PROJECT_DIR"
echo "🌐 Configured to run on port: \$PORT"

# 1. Create the Nginx configuration
cat <<EOF > nginx.conf
worker_processes 1;
daemon off; # Keeps Nginx in the foreground for easier debugging in dev

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       \$PORT;
        server_name  localhost;

        # Point this to your React app's build/dist directory
        root   \$DIST_DIR;
        index  index.html;

        # Fallback to index.html for Single Page Applications (React Router)
        location / {
            try_files \$uri \$uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
            expires 6M;
            access_log off;
            add_header Cache-Control "public";
        }
    }
}
EOF

echo "✅ Created nginx.conf"

# 2. Check for the dist directory and create a placeholder if it doesn't exist
if [ ! -d "\$DIST_DIR" ]; then
    echo "⚠️  No 'dist' directory found. Creating a placeholder..."
    mkdir -p "\$DIST_DIR"
    
    cat <<EOF > "\$DIST_DIR/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App Placeholder</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #282c34; color: white; }
        .container { text-align: center; }
        h1 { color: #61dafb; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Nginx is serving your React App!</h1>
        <p>This is a placeholder for your compiled React build on port \$PORT.</p>
        <p>Client-side routing is configured to fallback to this page.</p>
    </div>
</body>
</html>
EOF
    echo "✅ Created placeholder dist/index.html"
else
    echo "✅ Found existing 'dist' directory."
fi

echo ""
echo "🎉 Setup complete!"
echo "🚀 To start your server, run:"
echo "nginx -p \$(pwd) -c nginx.conf"
```

## 2. The Custom CrewAI Tool

Integrate this tool into your existing CrewAI setup. It acts as the bridge between your agent and the bash script.

```python
import os
import subprocess
from langchain.tools import tool

@tool("Setup Nginx for React")
def setup_nginx_for_react(port: str = "8080") -> str:
    """
    Useful to set up an Nginx configuration for a React single-page application.
    The input should be the port number to run Nginx on (default is 8080).
    It creates an nginx.conf and a placeholder dist/index.html in the current directory.
    """
    # Important: Adjust this path based on where your agent is running relative to the script
    script_path = "./nginx-react-setup.sh" 
    
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
```

## 3. Agent and Task Integration Examples

Here is how you can define an agent and a task using the tool defined above. You can adapt these to fit your existing configuration.

### Agent Definition Example

```python
from textwrap import dedent
from crewai import Agent

nginx_expert = Agent(
    role='Senior DevOps Engineer',
    goal='Automate and configure web servers (like Nginx) for frontend applications.',
    backstory=dedent("""
        You are an expert DevOps engineer specializing in Nginx and React deployments. 
        You know exactly how to configure reverse proxies, serve static files, and 
        handle client-side routing fallbacks for single-page applications. You prefer
        automating tasks using provided tools.
    """),
    verbose=True,
    allow_delegation=False, # Set based on your crew structure
    tools=[setup_nginx_for_react] # Assign the tool here
)
```

### Task Definition Example

```python
from crewai import Task

setup_task = Task(
    description=dedent("""
        The user needs an Nginx configuration set up to serve a React application in the 
        current working directory. Use your 'Setup Nginx for React' tool to generate the 
        necessary configuration files. The server should be configured to run on port 3000.
    """),
    expected_output="Confirmation that the Nginx configuration was successfully generated, including the command needed to start the server.",
    agent=nginx_expert
)
```

## Implementation Notes

1.  **Script Location:** Ensure that `nginx-react-setup.sh` is accessible to the Python environment running CrewAI. You might need to adjust the `script_path` inside the `setup_nginx_for_react` tool if it's not in the exact same directory.
2.  **Permissions:** The Python process must have execute permissions on the bash script (`chmod +x nginx-react-setup.sh`).
3.  **Dependencies:** This approach relies on the host machine having `bash` and standard Unix utilities available, which is typical for most deployment environments. Nginx itself does *not* need to be installed where the agent runs, only where the output configuration will eventually be used.
