# TabSera - Extensive bookmark and tab management

TabSera gives you a better oversight and improved tab management experience not provided
by default browser features.


## Installation

- Firefox: -
- Chrome: Download the extension from Google Web Store
- Microsoft Edge: -

## Development

Before you begin, make sure Node Package Manager (npm) is installed on your computer. The build and testing
commands depend on this.

1. Clone this repository to a folder on your computer
2. Open Google Chrome (preferably. Optimization for Firefox and Edge will be done at a later time)
3. Go to Chrome's menu -> Extensions -> Manage Extension
4. Turn on Developer mode
5. Click "Load unpacked"
6. Head for ***/tabfolders/dist/*** and select it
7. Voila, the extension is now installed!

- __Open options page:__ Click "Details" in the extension's box. Scroll down and click "Extension options"

### Commands

Go to /tabfolders.

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

Run unit and integration tests (JEST) and generate coverage results. The tests are available in /src/__tests__.
The coverage is presented in ./coverage/Icov-report/index.html

Run this command after changing existing components, to check if anything gets broken. Add new tests when adding new components or features.

### Programming and tools

HTML5, CSS3, Javascript/Typescript, React/Redux, JEST, SASS, Webextension API, Tailwind

## Ideas of upcoming features

### Options page
- Sort folders
- Sort windows/tabs
- Search tabs/folders
- Display number of folders, windows and tabs
- Current session
- Create/Edit folders
- Drag/drop folders
- Expand/Collapse all
- Close/Undo close tab(s)
- Merge folders
- Save window(s) to JSON or Google Drive
- Google Drive/Firebase sync
- Share folders
- Suspend tabs/windows of a folder when opened
- Dark theme
- Language (FI, SWE, EN)
- Close duplicate pages

### Upcoming Feature: Extension sidebar
- Search tabs by title or url
- Current session's windows and tabs as grid or list
- View folder contents as a nested list
- View folder contents in a new view
- Open folders, windows or tabs
- Close one or multiple tabs/windows
- Mark and bookmark tabs
- Mark and pin tabs (or only current tab???)
- Create folder from session
- Sort
- Expand/Contract folders
- (Export/Sync/Save To cloud or json file)
- (Undo close)
- Close duplicate pages


### Uninstallation
- Show feedback form

# Feedback
I would appreciate feedback and suggestions on how to improve this plugin. Reports of possible bugs are also welcomed. Please, post an issue or contact me per email: privat_thai_nguyen@hotmail.com

# Updates
Minor updates and improvements will be provided from time to time. There is no definite roadmap or schedule.

# Copyright
TabSera was created by Thai Nguyen. This plugin is free for private and professional use, with no limits nor warranty. The plugin itself and code that derives from it may not be monetized, re-distributed on other channels than this repo, nor used as part of commercial products/services/brands.

# Contact information
privat_thai_nguyen@hotmail.com