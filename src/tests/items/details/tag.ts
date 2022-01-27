import { Test } from '../..'

export const name = 'Tag'
export const execute: Test = function ({ profile,search }) {
    if (profile.discord.tag === profile.discord.username + '#' + profile.discord.discriminator) return true
    else return false
}