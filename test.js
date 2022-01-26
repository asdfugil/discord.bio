const profile_testsubject_slug = 'v'
let ok = 0
let notok = 0

const { Bio } = require(__dirname);
const util = require("util");
const bio = new Bio()
bio.details(profile_testsubject_slug)
.then(profile => {
//  console.error(util.inspect(profile, {depth:4}))
  console.log('Profile fetching with slug: OK'); ok += 1
  if (profile.slug === profile_testsubject_slug) {
    console.log('Profile slug: OK');
    ok += 1
  } else {
    console.log('Profile slug: NOT OK'); notok += 1
  }
  if (!isNaN(parseInt(profile.discord.discriminator))) {
    console.log('Discriminator: OK'); ok += 1
  } else {
    console.log('Discriminator: NOT OK'); notok += 1
  }
})
.catch((e) => {
  console.error(e);
  console.log('Profile fetching: NOT OK: '+ e); notok += 1
})
.then(() => {
  return bio.search({search:'v'})
})
.then(result => {
//  console.error(util.inspect(result, {depth:4}))
  console.log('Profile Searching: OK'); ok += 1
})
.catch((e) => {
  console.error(e);
  console.log('Profile searching: NOT OK: '+ e); notok += 1
})
.then(() => {
  // details with user id does not currently work
  // search is still broken
  console.log(`${ok} OK and ${notok} NOT OK.`)
  if (notok) process.exit(1);
})
