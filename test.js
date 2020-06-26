console.log('If it ends with Test Successful it worked.')
// Normally it is require("discord.bio")
const { Bio } = require('./')
const bio = new Bio()
bio.APIVersion().then(ver => console.log(`Library version:${require('./package.json').version}, testing against API version ${ver}`))
Promise.all([
bio.users.details('nickchan'),
bio.users.search('ven'),
bio.users.presence('570634232465063967'),
bio.topLikes()
]).then(result => { 
    console.log(result[0])
    const ven = result[1].first()
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log(`The most upvoted user that match the search term \`ven\` is ${ven.discord.tag}, with ${ven.user.likes} upvotes!`)
    console.log('Test successful ')
 })
.catch(error => {
    console.error("Test failed,reason:")
    console.error(error.stack)
    process.exit(1)
})