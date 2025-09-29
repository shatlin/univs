#!/bin/bash

# Use port 3847 - uncommon port unlikely to be used by other apps
PORT=3847

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting development server on port ${PORT}...${NC}"

# Function to kill process on port
kill_port() {
    local port=$1

    # Check if port is in use on macOS/Linux
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        PID=$(lsof -ti:$port)
    else
        # Linux
        PID=$(lsof -ti:$port || netstat -tlnp 2>/dev/null | grep :$port | awk '{print $7}' | cut -d'/' -f1)
    fi

    if [ ! -z "$PID" ]; then
        echo -e "${YELLOW}Found process $PID using port $port${NC}"
        echo -e "${RED}Killing process $PID...${NC}"
        kill -9 $PID 2>/dev/null || sudo kill -9 $PID 2>/dev/null
        sleep 1
        echo -e "${GREEN}Process killed successfully${NC}"
    else
        echo -e "${GREEN}Port $port is free${NC}"
    fi
}

# Kill any process using our port
kill_port $PORT

# Start the Next.js development server on the specified port
echo -e "${GREEN}Starting Next.js on port $PORT...${NC}"
echo -e "${GREEN}Access your app at: http://localhost:$PORT${NC}"
echo ""

# Run Next.js with turbopack on the specified port
npm run dev -- --port $PORT