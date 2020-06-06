# CLI Documentation
## Contents

- [Contents](#Contents)
- [Installing](#Installing)
- [Help message](#command-line-help-message)
- [Commands](#Commands)
  - [details](#details)
  - [search](#search)
  - [topUpvoted](#topUpvoted)
  - [version](#version)
  - [help](#help)

## Installing

```bash
npm i -g discord.bio
```
## Command line help message
```
Usage: dbio [options] [command]

Options:
  -h, --help                 display help for command

Commands:
  details <slug_or_user_id>  Display user details
  search <query>             Search for profiles, sorted by upvotes
  topUpvoted                 Show the most upvoted profiles, sorted by upvotes
  version                    Displays the API version
  help [command]             display help for command
```
## Commands
### details
Display user details

**Example:** `dbio details v` outputs

```xl
ven#7051(v)
↑ 107 upvotes

Description: 17. Full-stack developer; vue, node, python.
User ID:204616460797083648
Flags: house balance, early supporter, verified developer
Details
┌────────────┬────────────────────────────┐
│  (index)   │           value            │
├────────────┼────────────────────────────┤
│  location  │     'London, England'      │
│   gender   │           'male'           │
│   email    │      'admin@veno.dev'      │
│ created_at │ '2020-05-17T22:43:46.000Z' │
│ occupation │        'Developer'         │
│  verified  │            true            │
│   staff    │            true            │
└────────────┴────────────────────────────┘
Discord Connections
┌────────────┬─────────────────┬───────────────────────────────────┬──────────────────┐
│  (index)   │ Connection type │                URL                │       icon       │
├────────────┼─────────────────┼───────────────────────────────────┼──────────────────┤
│  venoras   │    'twitch'     │   'https://twitch.tv/venoras/'    │ 'fab fa-twitch'  │
│  venolol   │    'twitter'    │  'https://twitter.com/venolol/'   │ 'fab fa-twitter' │
│ discordbio │    'twitter'    │ 'https://twitter.com/discordbio/' │ 'fab fa-twitter' │
└────────────┴─────────────────┴───────────────────────────────────┴──────────────────┘
User Connections
┌───────────┬────────────────────┐
│  (index)  │       value        │
├───────────┼────────────────────┤
│  github   │     'venoras'      │
│  website  │ 'https://veno.dev' │
│ instagram │     'dualipa'      │
└───────────┴────────────────────┘

```

### search

Search for profiles, sorted by upvotes

**Example:** `dbio search nick` outputs

```
┌──────────────────────┬────────────┬──────────────────────┬──────────┬───────┬─────────┐
│       (index)        │    slug    │       User ID        │ Verified │ Staff │ Premium │
├──────────────────────┼────────────┼──────────────────────┼──────────┼───────┼─────────┤
│ Nick Chan#0001 (↑ 5) │ 'nickchan' │ '570634232465063967' │  false   │ false │  false  │
│   Nick#7894 (↑ 4)    │   'nick'   │ '161866437579898881' │  false   │ false │  false  │
│  Nickeo#0337 (↑ 0)   │  'nickeo'  │ '314759419197915137' │  false   │ false │  false  │
│  !Nick.S#3589 (↑ 0)  │  'nicks'   │ '523494475973132309' │  false   │ false │  false  │
│  nickpdx#2884 (↑ 0)  │ 'nickpdx'  │ '302915598038335490' │  false   │ false │  false  │
└──────────────────────┴────────────┴──────────────────────┴──────────┴───────┴─────────┘
```

### topUpvoted

Show the most upvoted user, sorted by upvotes.

```
┌─────────────────────────────────────────┬──────────────┬──────────────────────┬──────────┬───────┬─────────┐
│                 (index)                 │     slug     │       User ID        │ Verified │ Staff │ Premium │
├─────────────────────────────────────────┼──────────────┼──────────────────────┼──────────┼───────┼─────────┤
│          Derrios#0001 (↑ 189)           │  'derrios'   │ '264320223182585858' │   true   │ false │  true   │
│      ChanceSphere574#1537 (↑ 134)       │   'cs574'    │ '226001302524657665' │  false   │ false │  false  │
│          GrifGrif#0001 (↑ 124)          │  'grifgrif'  │ '401430491481374720' │   true   │ false │  true   │
│           Xen0me#9501 (↑ 119)           │   'xenome'   │ '284791000306810880' │  false   │ false │  false  │
│       dragonblitz10#9541 (↑ 111)        │   'dragon'   │ '198869192718417920' │   true   │ true  │  false  │
│            ven#7051 (↑ 107)             │     'v'      │ '204616460797083648' │   true   │ true  │  false  │
│           Zallom#0001 (↑ 89)            │   'zallom'   │ '268108606027726849' │  false   │ false │  false  │
│            Ichii#5999 (↑ 89)            │   'ichii'    │ '530061924130488351' │  false   │ false │  false  │
│           Rewera#0001 (↑ 88)            │   'rewera'   │ '282157210799308813' │  false   │ false │  false  │
│           Dramex#0001 (↑ 74)            │   'dramex'   │ '157605500488384512' │   true   │ false │  true   │
│        Thunder33345#9999 (↑ 71)         │  'thunder'   │ '116909055838126080' │  false   │ false │  false  │
│ nathfreder NovaScotiaStrong#8542 (↑ 67) │ 'nathfreder' │ '396677696899383296' │  false   │ false │  false  │
│            Shelp#0001 (↑ 63)            │   'shelp'    │ '179650847032999936' │  false   │ false │  false  │
│           LoveYou#1998 (↑ 62)           │  'loveyou'   │ '219475850947592192' │  false   │ false │  false  │
│             GPP#9510 (↑ 60)             │    'gpp'     │ '498481028697030656' │  false   │ false │  false  │
│           Neylto#9100 (↑ 58)            │   'neylto'   │ '154196385913241600' │  false   │ false │  false  │
│             MXE#1337 (↑ 55)             │    'mxe'     │ '343862533570166785' │  false   │ false │  true   │
│    ! Rú , MohamedTarek.#5655 (↑ 50)     │     'mt'     │ '328067262055448577' │  false   │ false │  false  │
│            ravy#0001 (↑ 50)             │  'princess'  │ '102102717165506560' │   true   │ false │  false  │
│         dragonwocky#8449 (↑ 46)         │ 'dragnwocky' │ '279098137484722176' │  false   │ false │  false  │
│           Himbeer#8553 (↑ 44)           │  'himbeer'   │ '139733914523664384' │  false   │ false │  false  │
│            stars#9093 (↑ 39)            │   'stars'    │ '301736945610915852' │  false   │ false │  false  │
│         Future HaMo#0001 (↑ 38)         │  'oldhamo'   │ '449180028232663040' │  false   │ false │  false  │
│      .WI$H U WERE HERE#0088 (↑ 33)      │   'maybe'    │ '617792956803448879' │  false   │ false │  false  │
│           Loukas.#4090 (↑ 32)           │   'voteme'   │ '583613334411280395' │  false   │ false │  false  │
│            AHMD#3000 (↑ 28)             │    'ahmd'    │ '644979759100592139' │  false   │ false │  false  │
│       . Nassem  ☭ ˣᴸ#0009 (↑ 27)        │   'nassem'   │ '676911772644671559' │  false   │ false │  false  │
└─────────────────────────────────────────┴──────────────┴──────────────────────┴──────────┴───────┴─────────┘
```
### version
Shows the API version.

Example: `dbio version` outputs

```
1.0.3
```
### help
Shows help message. Please see [here](#command-line-help-message)
