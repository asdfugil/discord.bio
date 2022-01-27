import fetch from 'node-fetch'
import { Test } from '../..'
export const name = 'Display Avatar URL'
export const execute: Test = async function ({ profile, search }) {
    const url = profile.discord.displayAvatarURL()
    const response = await fetch(url, { method: 'HEAD', headers: { 'user-agent': `discord.bio/${require('../../../../package.json').version} (+https://github.com/asdfugil/discord.bio)` } })
    if ((response.headers.get('Content-Type') as string).includes('image/')) return true
    else return false
}