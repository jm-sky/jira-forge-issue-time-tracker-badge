#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
else
    echo "Error: .env file not found"
    exit 1
fi

# Check if required variables are set
if [ -z "$FORGE_EMAIL" ] || [ -z "$FORGE_API_TOKEN" ]; then
    echo "Error: FORGE_EMAIL and FORGE_API_TOKEN must be set in .env file"
    exit 1
fi

# Run forge command with environment variables
export FORGE_USER_EMAIL="$FORGE_EMAIL"
export FORGE_USER_TOKEN="$FORGE_API_TOKEN"

# Execute the forge command passed as arguments
exec forge "$@"