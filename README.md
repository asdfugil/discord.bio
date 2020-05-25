# discord.bio

**BY USING THE LIBRARY YOU AGREE TO THE **[**TERMS OF SERIVICE OF DISCORD.BIO**](https://discord.bio/terms)

Node.js wrapper for https://discord.bio

[![NPM](https://nodei.co/npm/discord.bio.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/discord.bio/)

To install: 

```bash
npm i discord.bio 
```
## Changelogs

- `<User>.avatarURL() and <User>.displayAvatarURL()` is now a method so that you can pass options into it.
- Used the `UserFlags` class from discord.js
- Fixed some faulty typings
- user-related endpoints is now on `bio.users.<function>` e.g. `bio.details()` => `bio.user.details()`
- More exported typedefs and classes
- some methods now returns a collection instead of an array
- Improved rate-limit handling

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
bio.users.connections('v'),
bio.users.discordConnections('v'),
bio.topUpvoted(),
bio.totalUsers(),
bio.users.search('ven'),
]).then(result => { 
    const ven = result[5].first()
    const vdconnections = result[2]
    const vconnections = result[1]
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log(`The most upvoted user that match the search term \`ven\` is ${ven.discord.tag}, with ${ven.user.upvotes} upvotes!`)
    console.log(`Ven#7051 has ${vdconnections.size} discord connections!`)
    console.log(`Ven#7051 has ${Object.keys(vconnections).join(',')} connections on discord.bio`)
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

Type: [Bio](###Bio)

##### .users 

User-related endpoints, includes:

###### .details(slugOrID:string)

Get user details

Returns : Promise\<[Profile](###Profile)\>

###### .discordConnections(slugOrID:string)

Get the connections of a user on Discord

The key is the connection id,the value is the connection.

Returns: Promise\<Collection<number,[DiscordConnection](#####DiscordConnection)>\>

###### .connections(slugOrID:string)

Get a user's discord.bio connections

Returns: Promise\<[UserConnections](###UserConnections)\>

###### .search(query:string)

Search for profiles using `query` as the query.

The key is the user id,the value is the profile.

Type: Promise<[Collection](###Collection)<[Snowflake](###Snowflake),[PartialProfile](###PartialProfile)>>

###### .bio

the bio instance

Type: [Bio](###Bio)

#### Functions

##### .APIVersion()

Fetch the API version

Returns: Promise\<string\>

##### .topUpvoted()

Get most upvoted users

The key is the user id,the value is the profile.

Type: Promise<[Collection](###Collection)<[Snowflake](###Snowflake),[PartialProfile](###PartialProfile)>>

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

Type: [UserFlags](###UserFlags)

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

### UserFlags

This is just the `UserFlags` class from discord.js. Please refer to [here](https://discord.js.org/#/docs/main/12.2.0/class/UserFlags) .

### Collection

Collection class from discord.js. Please refer to [here](https://discord.js.org/#/docs/collection/master/class/Collection).

### DBioAPIError     extends Error

Represent an error 

#### Properties

##### .message

The error message

Type: string

##### .path

The path of the request that caused this error

Type: string

##### .method

The request method of the request that caused this error

Type: [HTTPRequestMethod](###HTTPRequestMethod)

### Base

Anything that has a .bio property

#### Property

##### .bio

The bio instance

Type: [Bio](###Bio)

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
 cached_flags | [UserFlags](###UserFlags) | the cached [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on the user's account. 
 staff | `boolean` | Whether the user is discord.bio staff 
 cached_avatar | `string` or `null` | The cached hash of the user's avatar, it will be prepended with "a_" if the avatar is animated 
 cached_username | `string` | The cached `DiscordTag#0001` of the user. (**Not** the user's username) 

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
icon| `string`| [The user's icon hash](https://discord.com/developers/docs/reference#image-formatting)
### UserConnections

An object mapping the discord.bio connections.

The property name is than name of the connection. Type: [ConnectionTypes](###ConnectionTypes)

The value is a [UserConnection](###UserConnection).

### ConnectionTypes

One of  `github`,`website`, `instagram`, `snapchat`,`linkedin`.

Type: string

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

### ImageURLOptions
This is also just a discord.js type definition, see [here](https://discord.js.org/#/docs/main/12.2.0/typedef/ImageURLOptions) for details.npm is ignor

### HTTPRequestMethod

valid http request methods

one of  `GET`,  `HEAD`,  `POST`,  `PUT`, `DELETE`, `CONNECT`,`OPTIONS`, `TRACE`,`PATCH`