console.log('If it ends with Test Successful it worked.')
const { Bio } = require('./')
const bio = new Bio()
Promise.all([
bio.users.details('nickchan'),
bio.users.connections('nickchan'),
bio.users.discordConnections('nickchan'),
bio.topUpvoted(),
bio.totalUsers(),
bio.APIVersion()
]).then(result => { 
    console.log(require('util').inspect(result,{depth:4}));
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log('Test successful ')
 })
.catch(error => {
    console.error("Test failed,reason:")
    console.error(error.stack)
})
