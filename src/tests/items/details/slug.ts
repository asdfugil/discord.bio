import { profile_testsubject_slug, Test } from '../..'

export const name = 'Discriminator'
export const execute: Test = function ({ profile, search }) {
    if (profile.slug === profile_testsubject_slug) {
        return true
    } else {
        return false
    }
}
