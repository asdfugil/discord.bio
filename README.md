# discord.bio
Node.js wrapper for https://discord.bio

[![NPM](https://nodei.co/npm/discord.bio.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/discord.bio/)

To install: 

```bash
npm i @types/node-fetch
npm i discord.bio 
```
## Examples
Example 1
```js
const Bio = require("discord.bio")
const bio = new Bio.Bio()
bio.fetchUserDetails("nickchan").then(console.log)
```
Example 2
```js
const Bio = require("discord.bio")
const bio = new Bio.Bio()
bio.login("some-cookie").then(() => bio.fetchUserDetails()).then(console.log)
```
## Class

### Bio

#### Constructor

```ts
new Bio.Bio(baseURL?:string)
```

#### Properties

##### .cookie

Authorization cookie used by this bio instance.

##### .baseURL 

The base url of hte api. Defaults to `https://api.discord.bio/v1`.

##### .user

The logged in user. Type [ClientUser](###ClientUser)
#### Methods

##### .fetchUserDetails(slugOrID?:string)

Fetches profile by user id or slug ,if sulgOrID is not provided,it will retrun the details of the logged in user.

Returns: `Promise<`[Profile](###Porfile)`>`

##### .fetchDiscordConnections(slugOrID?:string)

Fetches discord connections by user id or slug ,if sulgOrID is not provided,it will retrun the details of the logged in user.

Returns: `Promise<`[DiscordConnection](###DiscordConnection)`[]>`

##### .fetchUserConnections(slugOrID?:string)

Fetches User connections by user id or slug,if sulgOrID is not provided,it will retrun the details of the logged in user.

Returns:`Promise<`[UserConnections](###UserConnections)`>` 

##### .login(cookie)

Login by cookie

Returns: `Promise<`[ClientUser](###ClientUser)`>`   The logged user
##### .fetchTotalUsers()

Fetches the total number of users using discord.bio

Returns: `Promise<number>`  Total number of users using discord.bio

##### .fetchAPIVersion()

Fetches the API Version

Returns: `Promise<string>` The API Version

##### .fetchTopUpvoted()

Fetches the most upvoted users.
Returns:`Promise<Array<`[PartialProfile](###PartialProfile)`>>`

##### .createSlug(slug:string)

> This no longer works for users that already have a slug

Create a slug for the logged in user.

Returns: `Promise<void>`

##### .deleteProfile()

> Please think twice before using this.

Deletes the logged in user's discord.bio account.

Returns: `Promise<void>`

##### .updateProfile(settings)

Update thelogged in user's profile

`settings` is the new profile.
Returns:`Promise<void>`

##### .upvote(slugOrID:string)

Upvote someone
Returns: `Promise<void>`

### User     *extends [RawUser](###RawUser)*

Represent a user 

#### Own Properties

##### .avatarURL 

The URL to the users's avatar. 
Type: `string` or `null`

##### .displayAvatarURL

The URL to the user's avatar if they have one,or their default one if they don't have one.
Type: `string`

##### .defaultAvatarURL

Th URL to the user's default avatar.
Type: `string`

### RawUser   
Represent an unprocessed user returned by the api
#### Properties
##### .id

The User ID of the user
Type:`Snowflake`

##### .username

The username of the user
Type:`string`

##### .avatar

The avatar hash of the user
Type:`string`

##### .discriminator

The discriminator of the user
Type:`string`

### ClientUser     *extends [User](###RawUser)*

Represent the logged in user.

#### Own Properties

##### .mfa_enabled

Whether the user have their multi-factor authentication enabled.
Type: `boolean`

##### .connections

[Returns the user's linked third party accounts](https://discordapp.com/developers/docs/resources/user#connection-object)
Type: `Array<any>`

##### .flags

The [flags](https://discordapp.com/developers/docs/resources/user#user-object-user-flags) on the user's account.
Type: `number`

##### .premium_type

The [type of Nitro subscription](https://discordapp.com/developers/docs/resources/user#user-object-premium-types) that the user has on their account
```
1 = Nitro Classic
2 = Nitro
```
Type: `number`

## Type definitions

### ProfileSettings

The profile settings

  key|type|Meaning
  ---|---|---
  id| `number` | ID of the profile. 
  name| `string` | The slug. 
  user_id| `string` | User ID of the profile's user. 
  created_at| `string` or  `null` | The time the profile is created. 
  view_count| `number`            | View count of this profile.      
  slug_id |`number`|The ID of the slug.
  status| `string` or `null` | The status of the user. 
  description| `string` or `null` | The description of the user. 
  location| `string` or  `null` | The location of the user. 
  gender| `"male"` , `"female"` or `null` | Gender of the user. 
  birthday| `string` or `null` | The birthday of the user. 
  email| `string` or `null` | The email of the user. 
  occupation| `string` or  `null` | The occupation of the user. 
 banner | `string` or `null` | The URL to the profile banner. 
 upvotes | `number` | The number of upvotes the user have got. 
 premium | `boolean` | Whether the user has discord.bio premium. 
 verified | `boolean` | Whether the user has verified. 
 flags | `number` | the [flags](https://discordapp.com/developers/docs/resources/user#user-object-user-flags) on the user's account. 

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

| key            | type                      | meaning                             |
| -------------- | ------------------------- | ----------------------------------- |
| user_id        | [Snowflake](###Snowflake) | The user ID of the profile's user   |
| upvotes        | number                    | The number of upvote on the profile |
| verified       | boolean                   | Whether the user has verified.      |
| description    | `string` or `null`        | The description of the profile      |
| premium_status | number                    | [Type of nitro subscription](https://discordapp.com/developers/docs/resources/user#user-object-premium-types) of the user |
| name           | string                    | The slug of the profile.            |

### RawClientUser

The unprocessed client user returned by the API

| key           | type                      | meaning                            |
| ------------- | ------------------------- | ---------------------------------- |
| id            | [Snowflake](###Snowflake) | The user id of the user.           |
| username      | string                    | The username of the user.          |
| avatar        | `string` or `null`        | The avatar hash of the user.       |
| discriminator | string                    | The discriminator of the user.     |
| locale        | string                    | The locale of the user             |
| premium_type  | number                    | Type of nitro subscription of the user |
| mfa_enabled   | boolean                   | Whether the user has MFA enabled.  |
| flags         | number                    | The flags on this user             |
| connections   | `unknown`                 | The third-party connections of this user |



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

## FAQs

**Q: I get  `error TS7016: Could not find a declaration file for module 'node-fetch'.`  and 3 more TS errors when installing?**
**Reason:** You didn't install `@types/node-fetch`

**Solution:** run `npm i @types/node-fetch`
This should solve other TS**** errors
