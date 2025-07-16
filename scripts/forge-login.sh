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

# Login to Forge
forge login -u "$FORGE_EMAIL" -t "$FORGE_API_TOKEN"