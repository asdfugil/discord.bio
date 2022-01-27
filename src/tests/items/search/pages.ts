import { Test, bio } from '../..'
import { isDeepStrictEqual } from 'util'

export const name = 'Paging'
export const execute: Test = async function ({ profile, search }) {
    if (isDeepStrictEqual(search, await bio.search({ page: 2 }))) return false
    else return true
}