#!/usr/bin/env node
const { Bio } = require(".")
const bio = new Bio()
let fullfilled = 0
bio.on('rateLimit', re => console.log(`Retry-After: ${re}`))
for (let i =0;i <300;i++) {
    bio.APIVersion().then(v => {
        fullfilled += 1
        console.log("API Version:" + v)
        console.log("Quota:" + bio.__quota)
    })
}

setInterval(() => {
    console.log(fullfilled+"/300")
    console.log("Outgoing requests:"+bio.__outgoing_requests)
    console.log(bio.__quota_reset)
},5000)

