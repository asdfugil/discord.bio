# discord.bio

**BY USING THE LIBRARY YOU AGREE TO THE **[**TERMS OF SERIVICE OF DISCORD.BIO**](https://discord.bio/terms)

Node.js wrapper and CLI client for https://discord.bio

[![NPM](https://nodei.co/npm/discord.bio.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/discord.bio/)

To install: 

```bash
npm i discord.bio 
```
## Contents
- [Contents](#Contents)
- [Changelogs](#Changelogs)
- [Features](#Features)
- [CLI Documentation](#CLI Documentation)
- [Example](#Example)
  - [Classes](#Classes)
    - [Bio](#bio)
    - [User](#User)
    - [Activity](#Activity)
    - [Emoji](#Emoji)
    - [RichPresenceAssets](#RichPresenceAssets)
    - [UserFlags](#UserFlags)
    - [DBioAPIError](#DBioAPIError-----extends-Error)
    - [Collection](#Collection)
  - [Type definitions](#type-definitions)
    - [ProfileSettings](#ProfileSettings)
    - [Profile](#Profile)
    - [PartialProfile](#PartialProfile)
    - [PartialProfileSettings](#PartialProfileSettings)
    - [DiscordConnection](#DiscordConnection)
    - [UserConnections](#UserConnections)
    - [ConnectionTypes](#ConnectionTypes)
    - [ImageURLOptions](#ImageURLOptions)
    - [HTTPRequestMethod](#HTTPRequestMethod)
## Changelogs

- Updated licnese! please check it out

## CLI Documentation

Please go to [here](https://github.com/Assfugil/discord.bio/blob/stable/CLI.md) .

## Features

- 100% coverage of the public discord.bio api

- Rate limit handling

- Easy to use, parse gender,flags... etc. for you

## Example
```js
const { Bio } = require('discord.bio')
const bio = new Bio()
Promise.all([
bio.users.details('nickchan'),
bio.topUpvoted(),
bio.totalUsers(),
bio.users.search('ven'),
bio.users.presence('570634232465063967')
]).then(result => { 
    console.log(result[0])
    const ven = result[3].first()
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log(`The most upvoted user that match the search term \`ven\` is ${ven.discord.tag}, with ${ven.user.upvotes} upvotes!`)
 })
.catch(error => {
    console.error(error.stack)
})

```
## Classes

<h3> Bio</h3> Extends EventEmitter

```ts
const bio = new (require('discord.bio').Bio)(baseURL?)
```

baseURL: The base url

Defaults to https://api.discord.bio/v1

#### Properties

##### .baseURL

The base url
Type: string

##### .__quota

Number of request left
Type: number

##### .__quota_reset

The time when the quota resets.

Type: number

##### .__limit

Maximum amount of requests allowed in a time-frame

Type: number

##### .__outgoing_requests

Amount of outgoing requests

Type: number

##### .bio

The bio instance

Type: [Bio](#Bio)

##### .users 

User-related endpoints, includes:

###### .details(slugOrID: string)

Get user details

Returns : Promise\<[Profile](#Profile)\>

###### .search(query: string)

Search for profiles using `query` as the query.

The key is the user id,the value is the profile.

Type: Promise<[Collection](#Collection)<[Snowflake](#Snowflake),[PartialProfile](#PartialProfile)>>

###### .presence(user_id: Snowflake)

| Paramemter | Type | Meaning |
| ---------- | ---- |-------- |
|user_id| [Snowflake](#Snowflake) | The user id of the user that you want to know its presence |

Returns: Promise<[Activity](#Activity)[]>

###### .bio

the bio instance

Type: [Bio](#Bio)

#### Functions

##### .APIVersion()

Fetch the API version

Returns: Promise\<string\>

##### .topUpvoted()

Get most upvoted users

The key is the user id,the value is the profile.

Type: Promise<[Collection](#Collection)<[Snowflake](#Snowflake),[PartialProfile](#PartialProfile)>>

#### Events

##### rateLimit

| Parameter   | type     | Meaning                                               |
| ----------- | -------- | ----------------------------------------------------- |
| retry_after | `number` | Number of seconds before another request can be sent. |

### User

```js
const user = new (require('discord.bio').User)(rawUser)
```
#### Properties

   ##### .tag

 The `DiscordTag#1234` tag of the user. (e.g.: `Nick Chan#0001`)

Type: string

##### .defaultAvatarURL

The link to the user's default avatar URL 

Type: string

##### .public_flags

The flags on the user

Type: [UserFlags](#UserFlags)

##### .username

The username of the user 

Type: string

##### .discriminator

The discriminator of the user 

Type: string

##### .id

The id of the user 

Type: string

##### .avatar

The hash of the user's avatar, it will be prepended with "a_" if the avatar is animated 

Type: string or null

##### .avatarURL(options?)

Get an URL to the user's avatar

| Parameter | Type                                               | Meaning               |
| --------- | -------------------------------------------------- | --------------------- |
| options   | [ImageURLOptions](#ImageURLOptions) or `undefined` | Options for the image |

Returns: string or null

##### .displayAvatarURL(options?)

Get the URL to the user's avatar if the have one, or their default one if the don't have one.

| Parameter | Type                                               | Meaning               |
| --------- | -------------------------------------------------- | --------------------- |
| options   | [ImageURLOptions](#ImageURLOptions) or `undefined` | Options for the image |

Returns: string or null

### Emoji

#### Properties

##### .animated

Whether the emoji is animated 

Type: boolean

##### .createdAt

The time the emoji was created at, or null if unicode

Type: Date or null

##### .createdTimestamp

The timestamp the emoji was created at, or null if unicode 

Type: number or null

##### .id

The ID of this emoji 

Type: [Snowflake](#Snowflake) or null

##### .name

The name of this emoji

##### .identifier

The identifier of this emoji, used for message reactions

Type: string

##### .url

The URL to the emoji file if its a custom emoji 

Type: string or null

##### .deleted

Whether this emoji has been deleted

Type: boolean

#### Functions

##### .toString()

> Your bot will need to be in the server that the emoji is in for the emoji to form.

When concatenated with a string, this automatically returns the text required to form a graphical emoji on Discord instead of the Emoji object.

Returns: string

### Activity

Represent an activity on discord.

#### Properties

##### .assets
Assets for rich presence

Type: [RichPresenceAssets](#RichPresenceAssets)

##### .createdAt
The time the activity was created at

Type: Date

##### .createdTimestamp
Creation date of the activity 

Type: number

##### .details
Details about the activity

Type: string or null

##### .emoji
Emoji for a custom activity 

Type: [Emoji](#Emoji) or null

##### .flags
Flags that describe the activity 

Type:ActivityFlags

##### .party
Party of the activity 
key|type|meaning
---|---|---
id|string or null|ID of the party
size|[number,number]|Size of the party as [current, max]

Type: object or null
##### .timestamps
Timestamps for the activity 
key|type|meaning
---|---|---
start|Date or null|When the activity started
end|Date or null|When the activity ended

Type: object or null
##### .state
State of the activity

Type: string | null
##### .type
The type of the activity status 

Type: [ActivityType](https://discord.js.org/#/docs/main/12.2.0/typedef/ActivityType)
##### .url
If the activity is being streamed, a link to the stream 

Type: string | null
#####  .applicationID
Application ID associated with this activity 

Type: string | null

#### Functions

##### .equals(activity)

Whether this activity is equal to another activity.

activity: The actvity to compare with

Returns: boolean

### UserFlags

This is just the `UserFlags` class from discord.js. Please refer to [here](https://discord.js.org/#/docs/main/12.2.0/class/UserFlags) .

### Collection

Collection class from discord.js. Please refer to [here](https://discord.js.org/#/docs/collection/master/class/Collection).

### DBioAPIError     extends Error

Represent an error 

#### Properties

##### .message

The error message, or the response status text if there isn't one.

Type: string

##### .path

The path of the request that caused this error

Type: string

##### .method

The request method of the request that caused this error

Type: [HTTPRequestMethod](#HTTPRequestMethod)

##### .statusCode

HTTP response status code

Type: number

### Base

Anything that has a .bio property 

#### Property

##### .bio

The bio instance

Type: [Bio](#Bio)

### RichPresenceAssets
Assets for rich presence
#### Properties
##### .activity

Activity that these assets belongs to 

Type: [Activity](#Activity)

##### .largeText

Hover text for the large image

Type: string or null

##### .smallText

Hover text for the small image

Type: string or null

##### .largeImage

ID of the large image asset

Type: [Snowflake](#Snowflake)

##### .smallImage

ID of the small image asset

Type: [Snowflake](#Snowflake)

#### Functions

##### .largeImageURL(options?)

Gets the URL of the large image asset

| Parameter      | type                | meaning               |
| -------------- | ------------------- | --------------------- |
| options        | object or undefined | Options for the image |
| options.format | string or undefined | Format of the image   |
| options.size   | number or undefined | Size of the image     |

Returns: string or null
##### .smallImageURL(options?)

Gets the URL of the small image asset

| Parameter      | type                | meaning               |
| -------------- | ------------------- | --------------------- |
| options        | object or undefined | Options for the image |
| options.format | string or undefined | Format of the image   |
| options.size   | number or undefined | Size of the image     |

Returns: string or null

## Type definitions

### ProfileSettings

The profile settings

  key|type|Meaning
  ---|---|---
 slug | `string` | The slug. 
  user_id| [Snowflake](#Snowflake) | User ID of the profile's user. 
  created_at| `string` or  `null` | [DEPRECATED] The date string of the time the profile is created 
 createdAt | `Date` | The date that the profile is created 
 createdTimestamp | `number` or `null` | The timestamp in ms that the profile is created 
  description| `string` or `null` | The description of the user. 
  location| `string` or  `null` | The location of the user. 
  gender| `'male'` , `'female'`,'`'non-binary'`,or `null` | Gender of the user. 
  birthday| `Date` or `null`                                | The birthday of the user. 
  email| `string` or `null` | The email of the user. 
  occupation| `string` or  `null` | The occupation of the user. 
 banner | `string` or `null` | The URL to the profile banner. 
 upvotes | `number` | [DEPRECATED] The number of likes the user have got. 
 likes | `number` | The number of likes on the profile. 
 premium | `boolean` | Whether the user has discord.bio premium. 
 verified | `boolean` | Whether the user has verified. 
 flags | [UserFlags](#UserFlags) | the cached [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on the user's account. 
 staff | `boolean` | Whether the user is discord.bio staff 

### Profile

Represent a discord.bio profile 

key|type|Meaning
---|---|---
user| object                                      |User information
user.details| [ProfileSettings](#ProfileSettings)       |The details of the user
user.discordConnections| [DiscordConnection](#DiscordConnection)[] |Array of the user's connections on discord
user.userConnections| [UserConnections](#UserConnections)       |the user's connections on discord.bio
discord|[User](#User)|The user that this profile represents.

### PartialProfile
Represent an incomplete profile
key|type|meaning
---|---|---
user| [PartialProfileSettings](#PartialProfileSettings) |The settings of this profile.
discord| [User](#User)                                     |The user of this profile

### PartialProfileSettings

The settings of an incomplete profile

| key         | type               | meaning                                             |
| ----------- | ------------------ | --------------------------------------------------- |
| upvotes     | number             | [DEPRECATED] The number of likes the user have got. |
| verified    | boolean            | Whether the user has verified.                      |
| likes       | number             | The number of likes the user have got.              |
| description | `string` or `null` | The description of the profile                      |
| premium     | boolean            | Whether the user has discord.bio premium            |
| name        | string             | The slug of the profile.                            |

### DiscordConnection

Represent a discord user connection

key|type|Meaning
---|---|---
connection_type| `string`| The type of the connection. 
name| `string` | The name of the connection. 
url| `string` or  `null`| The url of the connection. 
icon| `string`| [The user's icon hash](https://discord.com/developers/docs/reference#image-formatting)
### UserConnections

An object mapping the discord.bio connections.

The property name is than name of the connection. Type: [ConnectionTypes](#ConnectionTypes)

The value is the name of the connection. Type: `string`

### ConnectionTypes

One of  `github`,`website`, `instagram`, `snapchat`,`linkedin`.

Type: string

### Snowflake

A Twitter snowflake, except the epoch is 2015-01-01T00:00:00.000Z 

```
If we have a snowflake '266241948824764416' we can represent it as binary:

64                                          22     17     12          0
 000000111011000111100001101001000101000000  00001  00000  000000000000
      number of ms since Discord epoch       worker  pid    increment
```

### ImageURLOptions
This is also just a discord.js type definition, see [here](https://discord.js.org/#/docs/main/12.2.0/typedef/ImageURLOptions) for details.npm is ignor

### HTTPRequestMethod

valid http request methods

one of  `GET`,  `HEAD`,  `POST`,  `PUT`, `DELETE`, `CONNECT`,`OPTIONS`, `TRACE`,`PATCH`
