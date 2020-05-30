export const defaults = {
    'baseurl':'https://api.discord.bio/v1'
}
export type Headers = {
    [key:string]:string | undefined
}
export const headers:Headers = {
    'user-agent':'discord.bio/6.0.1 (+https://github.com/Assfugil/discord.bio)',
    'content-type':'application/json; charset=utf-8'
}