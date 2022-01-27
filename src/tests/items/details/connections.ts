import { Test } from '../..'

export const name = 'Connections'
export const execute: Test = function ({ profile,search }) {
    for (const connection of profile.connections) {
        if (connection.platform !== 'BIO') return false
        if (!connection.name || !connection.type) return false
    }
    return true
}