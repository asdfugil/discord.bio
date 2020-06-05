import { Bio } from '../..'
import { bold } from 'colors'
const bio = new Bio()
async function search(query: string): Promise<void> {
    const results = await bio.users.search(query)
    if (!results.first()) {
        console.error('No results found.')
        process.exit(1)
    }
    const data:{[key:string]:any} = {}
    results.forEach(result => {
        data[bold(result.discord.tag) + ` (↑ ${result.user.upvotes})`] = {
            slug:result.user.slug,
            'User ID':result.discord.id,
            //'Description':result.user.description || 'No description.',
            'Verified':result.user.verified,
            'Staff':result.user.staff,
            'Premium':result.user.premium,
        }
    })
    console.table(data)
}
export = search