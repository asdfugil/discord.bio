import { Test } from '../..'

export const name = 'Slug'
export const execute: Test = function({ profile,search }) {
    if (!isNaN(parseInt(profile.discord.discriminator))) {
        return true
    } else {
        return false
    }
}