# Version History
All API breaking features, minor changes, and bug fixes will be documented here.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.0.0] - 2016-10-9
- Created repository and copied relevant files over from contact-list repo.

## [0.1.0] - 2016-10-11
- Added client-side routing capability with `angular-ui-route` to allow nested partials
- Appended server-side routes to the `/api/` route to fix route conflict
- Changed icon for adding a new contact to be a silhouette with a plus sign
- Added dashboard page and set it as new home
- Added Bootstrap navbar
- Fine-tuned the stylesheets for the new layout
- Fixed specs that were failing due to the new architecture/routes
- Removed some comments to make it cleaner
- Generated new documentation

## [1.1.0] - 2016-12-8
- Installed passport and passport-facebook
- Set up Passport verification/authentication and session logic in server.js
- Added routes for session endpoints and refactored routes to be more readable, take arguments
- Used Passport to secure API and certain session endpoints
- Added login page, which is just a button that redirects to Facebook login
- Added session.service which checks to see if a user is logged in, and redirects to login page if not
- Added session.controller which can manipulate session data such as username and profile picture
- Added user dropdown menu to navbar which displays username and profile picture, and contains logout
- Styled many elements to move towards a dark theme
- Refactored module names to be more in line with best practices
- Added sample config files to remind myself how they are used
- Updated .gitignore to be more in line with my other apps
