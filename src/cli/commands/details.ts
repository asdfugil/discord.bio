import { Bio, ConnectionTypes,DBioAPIError } from '../..'
import { bold } from 'colors'
const bio = new Bio()
async function details (slug:string):Promise<void> {
    const profile = await bio.users.details(slug)
    .catch((error:DBioAPIError) => {
        if (error.statusCode === 404) console.error(`Profile "${slug}" not found.`)
        else console.error(error)
        process.exit(1)
    })
    const { details,userConnections,discordConnections } = profile.user
    const flags = [];
    for (const [key, value] of Object.entries(
      profile.discord.public_flags.serialize()
    )) {
      if (value) flags.push(key.replace(/_/g,' ').toLowerCase());
    }
    console.log(bold(profile.discord.tag + `(${details.slug})`))
    console.log(bold(`↑ ${details.upvotes} upvotes`))
    console.log('')
    console.log(bold('Description:') + ' '+ details.description)
    console.log(bold('User ID:') + profile.discord.id)
    console.log(bold(`Flags: `) + (flags.join(', ') || '(none)'))
    console.log(bold('Details'))
    const info:['location','gender','birthday','email','createdAt','occupation','verified','staff'] = ['location','gender','birthday','email','createdAt','occupation','verified','staff']
    const data:{[key:string]:{ value:string | boolean | null | Date }} = {}
    for (const key of info) {
        if (details[key] as string | null| boolean) data[key] = { value: details[key] as string | null }
    }
    console.table(data)
    const dconnections_data:{[key:string]:any} = {}
    for (const connection of discordConnections) {
        dconnections_data[connection.name] = {
            'Connection type':connection.connection_type,
            'URL':connection.url,
            'icon':connection.icon
        }
    }
    console.log(bold('Discord Connections'))
    console.table(dconnections_data)
    let uConnections_data:{[key in ConnectionTypes]?:{value:string}} = {}
    for (const [key,value] of Object.entries(userConnections)) {
        if (value) uConnections_data[key as ConnectionTypes] = { value:value }
    }
    if (uConnections_data) {
    console.log(bold('User Connections'))
    console.table(uConnections_data) 
    }
}
export = details