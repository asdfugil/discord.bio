import { Test } from '../..'

export const name = 'User Flags'
export const execute: Test = function ({ profile,search }) {
    if (profile.discord.publicFlags.bitfield !== 0) return true
    else return false
}