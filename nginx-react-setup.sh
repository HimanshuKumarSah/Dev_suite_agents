#!/bin/bash

# Default port
PORT=${1:-8080}
PROJECT_DIR=$(pwd)
DIST_DIR="$PROJECT_DIR/dist"

echo "🤖 Setting up Nginx for React Project in: $PROJECT_DIR"
echo "🌐 Configured to run on port: $PORT"

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
        listen       $PORT;
        server_name  localhost;

        # Point this to your React app's build/dist directory
        root   $DIST_DIR;
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
if [ ! -d "$DIST_DIR" ]; then
    echo "⚠️  No 'dist' directory found. Creating a placeholder..."
    mkdir -p "$DIST_DIR"
    
    cat <<EOF > "$DIST_DIR/index.html"
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
        <p>This is a placeholder for your compiled React build on port $PORT.</p>
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
