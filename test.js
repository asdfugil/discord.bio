const { Bio } = require('./')
const bio = new Bio()
Promise.all([
bio.details('nickchan'),
bio.details('nickchan'),
bio.connections('nickchan'),
bio.discordConnections('nickchan'),
bio.topUpvoted(),
]).then(() => console.log('Test successful '))
.catch(error => {
    console.error("Test failed,reason:")
    console.error(error.stack)
})
