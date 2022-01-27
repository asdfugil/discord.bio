import { Test } from '../..'

export const name = 'Profile Settings'
export const execute: Test = function ({ profile,search }) {
    const items = ['rpcEnabled', 'commentsEnabled', 'searchEnabled'] as const
    if (items.every(x => typeof profile[x] === 'boolean')) return true
    else return false
}