import { Test } from '../..'

export const name = 'No Null Search Result'
export const execute: Test = function({ profile,search }) {
    if (search.some(x => x === null)) return false
    else return true
}