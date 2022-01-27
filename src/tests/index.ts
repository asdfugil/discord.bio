export const profile_testsubject_slug = 'nickchan'
let ok = 0
let notok = 0

import { Bio, Profile, PartialProfile } from '../'
import { Collection, Snowflake } from 'discord.js'
import { readdirSync } from 'fs'

/**A function that test an item */
export type Test = (data: { profile: Profile, search: Collection<Snowflake, PartialProfile> }) => boolean | Promise<boolean>
export type Chain = [Profile, Collection<Snowflake, PartialProfile>]
export const tests: Collection<string, Test> = new Collection()

process.chdir(__dirname)

export const bio = new Bio()
bio.details(profile_testsubject_slug)
    .catch((e) => {
        console.error(e);
        console.log('Profile fetching: NOT OK: ' + e); notok += 1
        throw new Error('Profile fetching test failed. Cannot continue')
    })
    .then(async (profile) => {
        console.log('Profile fetching: OK'); ok += 1
        return [profile, await bio.search({ search: 'v' })]
    })
    .then(([profile, search]) => {
        //  console.error(util.inspect(result, {depth:4}))
        if (search instanceof Collection) { console.log('Profile Searching: OK'); ok += 1 }
        else {
            notok += 1
            throw new Error('Search does not match expected')
        }
        return [profile, search] as Chain
    })
    .catch((e) => {
        console.error(e);
        console.log('Profile searching: NOT OK: ' + e); notok += 1
        return []
    })
    .then(async ([profile, search]) => {
        for (const cat of readdirSync('./items')) {
            for (const test of readdirSync('./items/' + cat).filter(x => x.endsWith('.js'))) {
                const { name, execute }: { name: string, execute: Test } = await import('./items/' + cat + '/' + test)
                tests.set(name, execute)
            }
        }
        return [profile, search] as Chain
    })
    .then(async ([profile, search]) => {
        for (const [name, execute] of tests) {
            if (await execute({ profile, search })) {
                ok += 1
                console.log(name + ': OK')
            } else {
                notok += 1
                console.log(name + ': NOT OK')
            }
        }
    })
    .then(() => {
        // details with user id does not currently work
        // search is still broken
        console.log(`${ok} OK and ${notok} NOT OK.`)
        if (notok) process.exit(1);
    })