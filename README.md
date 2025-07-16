# JIRA Forge Issue Time Tracker Badge

This project contains a Forge app written in Javascript. 

Description: Adds a badge or status to an issue panel showing time left based on due date or story points.

Key Features:
  - UI Kit app that adds a badge in the issue panel
  - Uses Forge Storage API to store custom time estimates (or pulls from story points)
  - Automatically updates with time remaining
  - Optionally shows color-coded warning (e.g. red if overdue)

What you’ll learn:
  - Issue panel UI
  - Forge Storage API
  - Date/time manipulation
  - Simple reactive UI

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app frontend by editing the `src/frontend/index.jsx` file.

- Modify your app backend by editing the `src/resolvers/index.js` file to define resolver functions. See [Forge resolvers](https://developer.atlassian.com/platform/forge/runtime-reference/custom-ui-resolver/) for documentation on resolver functions.

- Build and deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.
