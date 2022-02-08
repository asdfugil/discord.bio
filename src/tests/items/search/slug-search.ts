import { Test } from '../..'
import { PartialProfile } from '../../..'

export const name = 'Slug search'
export const execute: Test = async function ({ profile,search }) {
    return (await profile.bio.search({ search: 'v', filter: 'slug-search' })).first() instanceof PartialProfile
}
