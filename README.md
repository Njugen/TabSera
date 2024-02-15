# TabSera - Browser window and tab manager (Pre-Alpha)

<div style="text-align: center; margin: 2rem auto">
    <img src="./img/brand/brand.png" width="15%" />
</div>

TabSera gives you a better oversight and improved tab management experience not provided
by default browser features.

## Issue and purpose

Over the years, managing bookmarks in any web browser has always been easy. The problem is, the bookmarks are not immediately shown by the click of a button and require the user to go through annoying sub menus before accessing them. Bookmarks are not categorized conveniently and there is no way to relate one or more bookmarks to another.

In Chrome, managing bookmarks quickly becomes a chore because there is no nesting. While Firefox has this feature, its interface easily gets bloated with websites that were not bookmarked in the first place. Convenient features available in Chrome does not exist in Firefox, and vice versa. None of the browsers provide filtering by tags nor do they have extensive filtering nor overview. 

TabSera was created to improve these aspects, by providing simple overview and by combining features of both Firefox and Chrome. Advanced features are also provided for users who need more tools and/or extended overview.

For now, TabSera is still in development and certain features will be implemented at a later time.

## Screenshots

<img src="./img/main.jpg" width="33%" /> <img src="./img/settings.jpg" width="33%" /> <img src="./img/search.jpg" width="33%" /> <img src="./img/sidebar-draft.jpg" width="33%%" />

## Features

- Create and edit workspaces
- Duplicate and merge workspaces
- Launch workspace in either incognito or as groups
- Tab search and filtering (filtering not implemented yet)
- Tab suspension (upcoming)
- Tab tagging/filtering (upcoming)
- Nesting windows/tabs/workspaces (for now, only windows and tabs are nested within workspaces)
- Simplistic sidepanel, for quick overview
- Options page for extended overview

## Programming and tools

HTML5, CSS3/SASS, Javascript/Typescript, React, Redux, JEST, Tailwind, Webextension API

## Installation

- Firefox: No releases as of now
- Chrome: No releases as of now
- Microsoft Edge: No releases as of now

## Development

Before you begin, make sure Node Package Manager (npm) is installed on your computer. The build and testing
commands depend on this.

### Commands

__Build__

```
npm run build
```

The build will be available in the ./dist folder. This folder can be loaded
as a unpacked webextension into the browser. This folder is also used when packaging the extension
for distribution.

__Test__

```
npm run coverage
```

Run unit and integration tests (JEST). The tests are available in /src/__tests__. The coverage is presented in ./coverage/Icov-report/index.html

Run this command after changing existing components, to check if anything related to user interaction gets broken. Add new tests when adding new components or features. The tests are written to test user's interaction with the components.

### Install unpacked dev version in Chrome or Edge

1. Clone this repository to a folder on your computer
2. Open Google Chrome (preferably. Optimization for Firefox and Edge will be done at a later time)
3. Build the project
3. Go to Chrome's menu -> Extensions -> Manage Extension
4. Turn on Developer mode and click "Load unpacked"
5. Head for ***/tabfolders/dist/*** and select it

- __Open options page:__ Click "Details" in the extension's box. Scroll down and click "Extension options"
- __Open the sidepanel:__ Click the TabSera icon in your browser's toolbar

# Updates
Minor updates and improvements will be provided from time to time. There is no definite roadmap or schedule.


# Feedback
I would appreciate feedback and suggestions on how to improve this plugin. Reports of possible bugs are also welcome. Please, post an issue or contact me per email: privat_thai_nguyen@hotmail.com

# Contact information
Email: privat_thai_nguyen@hotmail.com

# Copyright &copy; Thai Nguyen
This plugin is free for private and professional use, with no limitations nor warranty. The plugin itself and code deriving from it may not be monetized, re-distributed, nor used as part of commercial products/services/brands.