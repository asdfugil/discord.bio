import { client } from 'websocket'
import fetch from 'node-fetch'
import { setInterval } from "timers";
import Profile from "../structures/Profile";
import { PartialProfile, Activity, UserConnections, ProfileSettings, PartialProfileSettings } from '..';
import { headers } from '../util/Constants';
const socket = new client()
async function connect(this:Profile) {
  socket.on('connectFailed', console.error)
  const info = await fetch('https://api.discord.bio/bio_ws/?EIO=3&transport=polling',{
    headers:{
      'user-agent':headers['user-agent'] as any,
    }
  }).then(res => res.text()).then(text => text.replace('96:0', '')).then(JSON.parse)
  socket.connect(`wss://api.discord.bio/bio_ws/?EIO=3&transport=websocket&sid=${info.sid}`)
  socket.on('connect', connection => {
    this.emit('connect')
    this.once('totalViewing',count => this.emit('subscribe',count))
    connection.on('close',  () => {
     this.bio.emit('debug',' Websocket Connection Closed');
     this.emit('disconnect')
    });
    connection.on('message',  (message) => {
      if (message.type !== 'utf8') return
      const msg = message.utf8Data as string
      if (['3probe','3','40'].includes(msg)) return
      this.emit('raw',msg)
      const [event,data]:[string,any] = JSON.parse(msg.substr(2))
        switch(event) {
          case 'TOTAL_VIEWING': this.emit('totalViewing',data);break
          case 'PRESENCE' : this.emit('presenceUpdate',new Activity(this.bio,data));break
          case 'PROFILE_UPDATE':{
            const { connections,settings } = data as {
              connections:UserConnections,
              settings:any
            }
              this.user.userConnections = connections
              this.user.details = new ProfileSettings(settings)
            this.emit('profileUpdate',{
              connections,
              settings:new ProfileSettings(settings)
            })
          };break
          case 'BANNER_UPDATE': this.emit('bannerUpdate',data as unknown)
          default: console.error(`Received unknown event "${event}"`)
        }
    });
      connection.send('2probe')
      connection.send('5')
      setInterval(() => {
          connection.send('2')
      },20000)
      connection.send("42"+JSON.stringify(["VIEWING",this.discord.id]))
  })
}
export = connect