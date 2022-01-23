export const bioOptionsDefaults = {
  rest: {
    'base_url': 'https://discords.com/bio/api',
    cdn_url: 'https://cdn.discordapp.com',
  },
  ws: {
    'gateway': 'discords.com/api-bio/bio_ws',
    autoConnect: false
  },
  scrapper: {
    base_url: 'https://discords.com/bio'
  },
  enableCaching: true
}
export type Headers = {
  [key: string]: string | undefined
}
export const headers: Headers = {
  'user-agent': `discord.bio/${require('../../package.json').version} (+https://github.com/asdfugil/discord.bio)`,
  'content-type': 'application/json; charset=utf-8'
}
