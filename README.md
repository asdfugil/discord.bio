# discord.bio

**BY USING THE LIBRARY YOU AGREE TO THE **[**TERMS OF SERIVICE OF DISCORD.BIO**](https://discord.bio/terms)

Node.js wrapper for https://discord.bio

[![NPM](https://nodei.co/npm/discord.bio.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/discord.bio/)

To install: 

```bash
npm i discord.bio 
```
## Changelogs
- This update contains typings for new features introduced by the discord.bio API
- fixed some faulty typings 
## Features

- Rate limit handling
- Easy to use, parse gender,flags... etc. for you

## Example

```js
const { Bio } = require('discord.bio')
const bio = new Bio()
Promise.all([
bio.details('nickchan'),
bio.details('nickchan'),
bio.connections('nickchan'),
bio.discordConnections('nickchan'),
bio.topUpvoted(),
]).then(result => console.(result))
.catch(error => {
    console.error(error.stack)
})

```

## Classes

<h3> Bio</h3> Extends EventEmitter

```js
const { Bio } = require('discord.bio')
const bio = new Bio(baseURL)
```

baseURL: The base url

Defaults to https://api.discord.bio/v1

#### Properties

##### .baseURL

The base url
Type: string

##### ._quota

Number of request left
Type: number

##### ._quota_reset

The time when the quota resets.

Type: number

#### Functions

##### .APIVersion()

Fetch the API version

Returns: Promise\<string\>

##### .details(slugOrID:string)

Get user details

Returns : Promise\<[Profile](###Profile)\>

##### .discordConnections(slugOrID?:string)

Get the connections of a user on Discord

Returns: Promise\<[DiscordConnection](#####DiscordConnection)[]\>

##### .connections(slugOrID?:string)

Get a user's discord.bio connections

Returns: Promise\<[UserConnections](###UserConnections)\>

##### .topUpvoted()

Get most upvoted users

Returns: Promise\<[ParrtialProfile](###PartialProfile)[]\>

##### .totalUsers()

Get the amount of users in discord.bio

Returns: Promise\<number\>

#### Events

##### rateLimit

| Parameter   | type     | Meaning                                               |
| ----------- | -------- | ----------------------------------------------------- |
| retry_after | `number` | Number of seconds before another request can be sent. |

### User

```js
const { User } = require('discord.bio')
const user = new User(rawUser)
```
| key              | type                      | Meaning                                                      |
| ---------------- | ------------------------- | ------------------------------------------------------------ |
| id               | string                    | user id                                                      |
| username         | string                    | username                                                     |
| avatar           | string or null            | avatar hash                                                  |
| discriminator    | string                    | user discriminator                                           |
| tag              | string                    | The tag of the user (e.g.: `Nick Chan#0001`)                 |
| public_flags     | [UserFlags](###UserFlags) | The flags on the user                                        |
| avatarURL        | string or null            | avatar url                                                   |
| displayAvatarURL | string                    | the link to the user's avatar if the have one,or their default one if they don't. |
| defaultAvatarURL | string                    | The link to the user's default avatar                        |

### UserFlags

```js
const { UserFlags } = require('discord.bio')
const userflags = new UserFlags(bits)
```

bits: The bitfield of the user's flags

Type: number

#### Properties

##### .bitfield

The bitfield of the flags

Type: number

##### .FLAGS  [Static]

Numeric user flags. All available properties:

- `DISCORD_EMPLOYEE`

- `DISCORD_PARTNER`

- `HYPESQUAD_EVENTS`
- `BUG_HUNTER_LEVEL_1`

- `HOUSE_BRAVERY`

- `HOUSE_BRILLIANCE`

- `HOUSE_BALANCE`

- `EARLY_SUPPORTER`

- `TEAM_USER`

- `SYSTEM`

- `BUG_HUNTER_LEVEL_2`

- `VERIFIED_BOT`

- `VERIFIED_BOT_DEVELOPER`

Type: Object

##### .DEFAULT  [Static]

Bitfield representing the default flags (0)

Type: number

##### .ALL   [Static]

Bitfield  represent every user flags combined

Type: number

#### Methods

##### .serialize()

Gets an object mapping field names to a [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating whether the bit is available.

Returns: Object

## Type definitions

### ProfileSettings

The profile settings

  key|type|Meaning
  ---|---|---
  name| `string` | The slug. 
  user_id| `string` | User ID of the profile's user. 
  created_at| `string` or  `null` | The time the profile is created 
  status| `string` or `null` | The status of the user. 
  description| `string` or `null` | The description of the user. 
  location| `string` or  `null` | The location of the user. 
  gender| `'male'` , `'female'`,'`'non-binary'`,or `null` | Gender of the user. 
  birthday| `string` or `null` | The birthday of the user. 
  email| `string` or `null` | The email of the user. 
  occupation| `string` or  `null` | The occupation of the user. 
 banner | `string` or `null` | The URL to the profile banner. 
 upvotes | `number` | The number of upvotes the user have got. 
 premium | `boolean` | Whether the user has discord.bio premium. 
 verified | `boolean` | Whether the user has verified. 
 public_flags | [UserFlags](###UserFlags) | the [flags](https://discordapp.com/developers/docs/resources/user#user-object-user-flags) on the user's account. 
 staff | `boolean` | Whether the user is discord.bio staff 
 cached_avatar | `string` or `null` | Cached avatar hash of the user 
 cached_username | `string` | Cached **tag** (**not** username) of the user 

### Profile

Represent a discord.bio profile 

key|type|Meaning
---|---|---
settings|[ProfileSettings](###ProfileSettings)|The settings of this profile.
discord|[User](###User)|The user that this profile represents.

### PartialProfile
Represent an incomplete profile
key|type|meaning
---|---|---
id| number                                              |The discord.bio ID of the profile.
user| [PartialProfileSettings](###PartialProfileSettings) |The settings of this profile.
discord| [User](###User)                                     |The user of this profile

### PartialProfileSettings

The settings of an incomplete profile

| key            | type                      | meaning                                  |
| -------------- | ------------------------- | ---------------------------------------- |
| user_id        | [Snowflake](###Snowflake) | The user ID of the profile's user        |
| upvotes        | number                    | The number of upvote on the profile      |
| verified       | boolean                   | Whether the user has verified.           |
| description    | `string` or `null`        | The description of the profile           |
| premium_status | boolean                   | Whether the user has discord.bio premium |
| name           | string                    | The slug of the profile.                 |

### DiscordConnection

Represent a discord user connection

key|type|Meaning
---|---|---
id| `number`| The ID of the connection. 
connection_type| `string`| The type of the connection. 
name| `string` | The name of the connection. 
url| `string` or  `null`| The url of the connection. 
icon| `string`| [The user's icon hash](https://discordapp.com/developers/docs/reference#image-formatting)
### UserConnections

An object containing discord.bio connections.The property name is the type of connection.

key|type
---|---
github| [UserConnection](###UserConnection)
website| [UserConnection](###UserConnection)
instagram|[UserConnection](###UserConnection)
snapchat| [UserConnection](###UserConnection)
linkedin| [UserConnection](###UserConnection)

### UserConnection

Represent a connection on discord.bio.

key|type|Meaning
---|---|---
name|`string`|The name of the connection.

### Snowflake

A Twitter snowflake, except the epoch is 2015-01-01T00:00:00.000Z 

```
If we have a snowflake '266241948824764416' we can represent it as binary:

64                                          22     17     12          0
 000000111011000111100001101001000101000000  00001  00000  000000000000
      number of ms since Discord epoch       worker  pid    increment
```

