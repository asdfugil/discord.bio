# discord.bio

This library scrapes the site https://discords.com/bio

[![NPM](https://nodei.co/npm/discord.bio.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/discord.bio/)

To install: 

```bash
npm i discord.bio 
```

## Support
Please open a issue for any bugs/feature requests/help.

## Contents
- [Contents](#Contents)
- [Changelogs](#Changelogs)
- [Features](#Features)
- [CLI Wrapper](#CLI-wrapper)
- [Documentation](#Documentation)
## Changelogs

- Fixed seaech and details functions.
- Removed functions no longer availabile via the API.
- Some properties changed as the upstream data also changed.
- `.search()` and `.details()` are now methods of `Bio.prototype`

## CLI wrapper

Please go to https://github.com/Assfugil/dbio-cli for details.

## Features

- 100% coverage of the public discord.bio api

- Rate limit handling (REST API only)

- Easy to use, parse gender,flags... etc. for you

## Example
```js
const { Bio } = require('discord.bio')
// Cookie is optional
const bio = new Bio({ cookie: '[REDACTED]' })
Promise.all([
    bio.details('nickchan'),
    bio.details('204616460797083648'), // This requires cookie to be set
    bio.search({ page: 2 }),
    bio.search({search: 'a',page: 1}),
    ])
.then(([profile, another_profile, all_profiles, search_result]) => {
    console.log(profile) // Profile of user with slug 'nickchan'
    console.log(another_profile) // Profile of user with ID '204616460797083648'
    console.log(all_profile) // Page 2 of all profiles
    console.log(search_result) // Page 1 of results of search for 'a'
})
```

# Documentation

Master branch (stable version): Go to https://discord-bio.js.org

Other branches: Please refer to the /docs folder
