import { Test } from '../..'

export const name = 'Like count'
export const execute: Test = function ({ profile,search }) {
    return (typeof profile.likes === 'number' && search.every(p => typeof p.likes === 'number'))
}