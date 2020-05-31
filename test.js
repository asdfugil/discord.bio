console.log('If it ends with Test Successful it worked.')
const { Bio } = require('./')
const bio = new Bio()
bio.APIVersion().then(ver => console.log(`Library version:${require('./package.json').version}, testing against API version ${ver}`))
Promise.all([
bio.users.details('nickchan'),
bio.topUpvoted(),
bio.totalUsers(),
bio.users.search('ven'),
bio.users.presence('570634232465063967'),
]).then(result => { 
    console.log(result[0])
    const ven = result[3].first()
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log(`The most upvoted user that match the search term \`ven\` is ${ven.discord.tag}, with ${ven.user.upvotes} upvotes!`)
    console.log('Test successful ')
 })
.catch(error => {
    console.error("Test failed,reason:")
    console.error(error.stack)
    throw error
})