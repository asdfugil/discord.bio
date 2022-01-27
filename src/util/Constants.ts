/**Default options for Bio */
export const bioOptionsDefaults = {
  /**REST API options */
  rest: {
    /**Base URL of API */
    'base_url': 'https://discords.com/bio/api',
    /**Base URL of Discord CDN */
    cdn_url: 'https://cdn.discordapp.com',
  },
  scrapper: {
    /**discord.bio website URL */
    base_url: 'https://discords.com/bio'
  },
  /**
   * Whether to store (partial) profiles after fetching
   * 
   * Cache exposed via bio.profiles
   */
  enableCaching: false
}
export type Headers = {
  [key: string]: string | undefined
}
export const headers: Headers = {
  'user-agent': `discord.bio/${require('../../package.json').version} (+https://github.com/asdfugil/discord.bio)`,
  'content-type': 'application/json; charset=utf-8'
}
