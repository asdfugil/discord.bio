# discord.bio

Node.js wrapper for https://discord.bio

To install: 

```bash
npm i @types/node-fetch
npm i discord.bio 
```

## Functions

### .fetchProfile(slugOrID?)

Fetches profile by user id or slug ,if sulgOrID is not provided,it will retrun the details of the logged in user.

Returns: `Promise<`[Profile](###Porfile)`>`

### .fetchDiscordConnections(slugOrID?)

Fetches discord connections by user id or slug ,if sulgOrID is not provided,it will retrun the details of the logged in user.

Returns: `Promise<`[DiscordConnection](###DiscordConnection)`[]>`

### .fetchUserConnections(slugOrID?)

Fetches User connections by user id or slug,if sulgOrID is not provided,it will retrun the details of the logged in user.

Returns:`Promise<`[UserConnections](###UserConnections)`>`

### .login(accessToken)

Login by OAuth2 access token

Returns the `Promise<string>`

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
  gender| `string`  or `null` | Gender of the user. 
  birthday| `string` or `null` | The birthday of the user. 
  email| `string` or `null` | The email of the user. 
  occupation| `string` or  `null` | The occupation of the user. 
 banner | `string` or `null` | The URL to the profile banner. 

### Profile

Represent a discord.bio profile 

key|type|Meaning
---|---|---
success|`boolean`|Whether the profile is fetched successfully.
settings|[ProfileSettings](###ProfileSettings)|The settings of this profile.
discord|[User](###User)|The user that this profile represents.

### User

Represent a discord user. 

key|type|Meaning
---|---|---
id| [Snowflake](###Snowflake) | The user id of the user. 
username| `string`| The username of the user. 
avatar| `string`| The avatar hash of the user. 
discriminator| `string`| The discriminator of the user. 

### DiscordConnection

Represent a discord user connection

key|type|Meaning
---|---|---
id| `number`| The ID of the connection. 
connection_type| `string`| The type of the connection. 
name| `string` | The name of the connection. 
url| `string` or  `null`| The url of the connection. 
icon| `string`| Unknown. a non-empty string. 
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