console.log('[discord.bio] If it ends with OK it worked')
const { sync } = require('command-exists')
const { execSync } = require('child_process')
let built = false
if (sync('tsc') && !built) {
    let version = execSync('tsc -v').toString().replace('\n','').replace('Version ','')
    console.log(`[discord.bio] Found typescript@${version}`)
    if (version.startsWith('3.')) {
        version = version.substr(2)
        if (parseInt(version.split(".")[0]) >= 7) {
            console.log(execSync('tsc').toString())
            built = true
        }
    }
    if (!built) {
        console.log('[discord.bio] Installed typescript version is not compatible, next method: pnpx')
    }
} 
if (sync('pnpx') && !built) {
    console.log(execSync('pnpx -p typescript@3.9.5 tsc').toString())
    built = true
} else if (!built) console.log('[discord.bio] pnpx not found, next method: npx')
if (sync('npx') && !built) {
    console.log(execSync('npx -p typescript@3.9.5 tsc').toString())
    built = true
} else if (!built) console.log('[discord.bio] npx not found')
if (!built) {
    console.error('[discord.bio] Cannot find a global installation of typescript@>=3.7, pnpx and npx')
    process.exit(1)
}
console.log('[discord.bio] OK')
