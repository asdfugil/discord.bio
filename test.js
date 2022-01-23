console.log('If it ends with Test Successful it worked.')
// Normally it is require("discord.bio")
const { Bio } = require('./')
const { profile } = require('console')
const bio = new Bio()
console.log(bio.options)
console.log(`Library version:${require('./package.json').version}`)
Promise.all([
bio.users.details('nickchan'),
bio.users.search('v'),
bio.topLikes(),
bio.totalUsers()
]).then(result => { 
    console.log(result[0])
    console.log(result[1].first())
    console.log(result[2])
    console.log(`Total Users: ${result[3]}`)
    result[0].connect()
    const githubURL = result[0].user.discordConnections.find(x => x.type === 'github').url
    console.log(`GitHub URL: ` + githubURL)
    result[0].on('raw',console.log)
    result[0].once('viewCountUpdate',(oldCount,newCount) => {
      console.log(`Old view count: ${oldCount}`)
      console.log(`New view count: ${newCount}`)
    })
    result[0].once('subscribe',() => {
      console.log('Test successful ')
      process.exit()
    })
    const ven = result[1].first()
    console.log(`Avatar URL of Nick Chan#0001: ${result[0].discord.avatarURL({ size:1024,dynamic:true })}`)
    console.log(`Display Avatar URL of Nick Chan#0001: ${result[0].discord.displayAvatarURL({ size:1024,dynamic:true })}`)
    console.log(`Default URL of Nick Chan#0001: ${result[0].discord.defaultAvatarURL}`)
    console.log(`The most upvoted user that match the search term \`ven\` is ${ven.discord.tag}, with ${ven.user.likes} upvotes!`)
 })
.catch(error => {
    console.error("Test failed,reason:")
    console.error(error.stack)
    process.exit(1)
})
