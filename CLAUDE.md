# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JIRA Forge Issue Time Tracker Badge app that adds a badge or status to issue panels showing time left based on due date or story points. The app will integrate with an external API server for additional functionality.

## Key Features (Planned)
- UI Kit app that adds a badge in the issue panel
- Uses Forge Storage API to store custom time estimates (or pulls from story points)
- Automatically updates with time remaining
- Color-coded warning system (e.g. red if overdue)
- External API integration with authentication

## Technology Stack (Expected)
- Atlassian Forge platform
- Forge UI Kit for issue panel integration
- Forge Storage API for persistence and JWT token storage
- External API requests with authentication headers
- React/JavaScript for UI components

## Development Commands
Since this is a new project, standard Forge commands will likely be:
- `forge create` - Initialize the Forge app
- `forge install` - Install dependencies
- `forge deploy` - Deploy to development environment
- `forge tunnel` - Start development tunnel

## Architecture Notes
The app will integrate with JIRA's issue panel and require:
- Issue panel UI component
- Time calculation logic based on due dates or story points
- Storage integration for custom time estimates and JWT tokens
- Reactive updates for time remaining display
- External API client with JWT authentication
- Secure storage of API credentials and tokens using Forge Storage API

## External API Integration
- Use Forge's `api.fetch()` for external requests
- Store JWT tokens securely in Forge Storage API
- Implement proper error handling for API failures
- Consider rate limiting and caching for API responses