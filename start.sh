#!/bin/bash
# Church website start script
# Starts the backend server and cloudflare quick tunnel

DOTNET="$HOME/.dotnet/dotnet"
CLOUDFLARED="$HOME/cloudflared"
PROJECT_DIR="$HOME/Документы/New OpenCode Project/church-website/src/Church.Api/bin/Debug/net8.0"
LOG_DIR="/tmp"

# Kill old processes
kill $(lsof -t -i:5000) 2>/dev/null
kill $(pgrep cloudflared) 2>/dev/null
sleep 2

# Start backend
cd "$PROJECT_DIR"
setsid $DOTNET Church.Api.dll > "$LOG_DIR/church-server.log" 2>&1 &
echo "Server PID: $!"

# Wait for server
sleep 5

# Check server
if curl -s -o /dev/null http://localhost:5000/api/pages; then
    echo "Server OK"
else
    echo "Server FAILED"
    exit 1
fi

# Start cloudflare tunnel
setsid $CLOUDFLARED tunnel --url http://localhost:5000 > "$LOG_DIR/cloudflared.log" 2>&1 &
echo "Cloudflared PID: $!"

# Wait and extract URL
sleep 10
URL=$(grep -o 'https://[^ ]*trycloudflare.com' "$LOG_DIR/cloudflared.log" | head -1)

if [ -n "$URL" ]; then
    echo ""
    echo "========================================="
    echo "  Church website is live!"
    echo "  $URL"
    echo "========================================="
else
    echo "Tunnel FAILED. Check $LOG_DIR/cloudflared.log"
fi
