console.log('If it ends with Test Successful it worked.')
const { Bio } = require('./')
const bio = new Bio()
bio.APIVersion().then(ver => console.log(`Library version:${require('./package.json').version}, testing against API version ${ver}`))
Promise.all([
bio.users.details('nickchan'),
bio.users.connections('v'),
bio.users.discordConnections('v'),
bio.topUpvoted(),
bio.totalUsers(),
bio.users.search('ven'),
]).then(result => { 
    const ven = result[5].first()
    const vdconnections = result[2]
    const vconnections = result[1]
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log(`The most upvoted user that match the search term \`ven\` is ${ven.discord.tag}, with ${ven.user.upvotes} upvotes!`)
    console.log(`Ven#7051 has ${vdconnections.size} discord connections!`)
    console.log(`Ven#7051 has ${Object.keys(vconnections).join(',')} connections on discord.bio`)
    console.log('Test successful ')
 })
.catch(error => {
    console.error("Test failed,reason:")
    console.error(error.stack)
})
