const { Bio } = require('.')
const bio = new Bio()
bio.users.details('nickchan')
.then(profile => {
  profile.on('raw',console.log)
  profile.on('connect',() => console.log('Connected!'))
  profile.on('profileUpdate',(oldProfile,newProfile) => {
    console.log('hi')
  })
  profile.connect()
})