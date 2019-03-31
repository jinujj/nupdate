# nupdate

Added an interactive cli tool to update the package.json in any project. Many times it was come into my notice there is no interactive way of updating the package version ```nupdate``` is a library provided to help with this.

# Usage

Run ```nupdate``` in any project containing package.json

# How to run?

1) Checkout the project
2) ```npm install```
3) ```npm link```  : this will allow you to run the command nupdate from any location
4) ```nupdate```   : this will list all the updated the version.
5) Follow the prompt and all the web components will be installed into your project.

# Upcoming
1) Noticed that npm-check-update may not able to get the latest version if we don't have a valid certificate for the npm repository. Current implementation rely on ```ncu``` to get the infomration from global npm repositories. 
2) One of the solution for problem is to rely on ```npm outdated```. This has another problem that the version for dev dependency is not listed. We can solve this problem by passing the save flage ```npm outdated --save-dev```

