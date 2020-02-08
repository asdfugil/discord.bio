# discord.bio

Node.js wrapper for https://discord.bio

## Functions

### .fetchProfile(slugOrID)

Fetches profile by user id or slug 

Returns: `Promise<`[Profile](###Porfile)`>`

### .fetchDiscordConnections(slugOrID)

Fetches discord connections by user id or slug 

Returns: `Promise<`[DiscordConnection](###DiscordConnection)`>`

### .fetchUserConnections(slugOrID)

Fetches User connections by user id or slug

Returns:`Promise<`[UserConnections](###UserConnections)`>`

## Type definitions

### ProfileSettings
  key|type
  ---|---
  id| `string` 
  name| `string` 
  user_id| `string` 
  created_at| `string` or  `null` 
  view_count| `number` 
  slug_id |`string`
  status| `string` or `null` 
  description| `string` or `null` 
  location| `string` or  `null` 
  gender| `string`  or `null` 
  birthday| `string` or `null` 
  email| `string` or `null` 
  occupation| `string` or  `null` 

### Profile
key|type
---|---
success|`boolean`
id|`number`
settings|[ProfileSettings](###ProfileSettings)
discord|[User](###User)

### User
key|type
---|---
id| `string`
username| `string`
avatar| `string`
discriminator| `string`

### DiscordConnection
key|type
---|---
id| `number`
connection_type| `string`
name| `string` 
url| `string` or  `null`
icon| `string`
### UserConnections
key|type
---|---
github| [UserConnection](###UserConnection)
website| [UserConnection](###UserConnection)
instagram|[UserConnection](###UserConnection)
snapchat| [UserConnection](###UserConnection)
linkedin| [UserConnection](###UserConnection)

### UserConnection
key|type
---|---
name|`string`
