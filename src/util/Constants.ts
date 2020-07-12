export const bioOptionsDefaults = {
  rest: {
    'base_url': 'https://api.discord.bio/v1',
     cdn_url: 'https://cdn.discordapp.com',
  },
  ws: {
    autoConnect:false,
    'gateway': 'api.discord.bio/bio_ws'
  }
}
export type Headers = {
  [key: string]: string | undefined
}
export const headers: Headers = {
  'user-agent': `discord.bio/${require('../../package.json').version} (+https://github.com/Assfugil/discord.bio)`,
  'content-type': 'application/json; charset=utf-8'
}