import WebSocket from 'ws'
import fetch from 'node-fetch'
import Profile from "../structures/Profile";
import { performance } from 'perf_hooks'
import { headers, bioOptionsDefaults } from '../util/Constants';
import Presence from '../structures/Presence';
import { EventEmitter } from 'events';
/**Connect to this profile's websocket */
async function connect(this: Profile) {
  const info = await fetch(`https://${bioOptionsDefaults.ws.gateway}/?EIO=3&transport=polling`, {
    headers: {
      'user-agent': headers['user-agent'] as any,
    }
  }).then(res => res.text()).then(text => text.replace('96:0', '')).then(JSON.parse)
  const socket = new WebSocket(`wss://${bioOptionsDefaults.ws.gateway}/bio_ws/?EIO=3&transport=websocket&sid=${info.sid}`)
  this.ws.socket = socket
  let sent2: number
  socket.on('unexpected-response',(req,res) => {
    this.emit('error',req,res)
  })
  let interval: ReturnType<typeof setInterval>
  socket.once('open', () => {
    this.emit('connect')
    this.once('viewCountUpdate', count => this.emit('subscribe', count))
  })
  let now:number
  socket.on('open',() => {
    socket.send('2probe')
    now = performance.now()
    socket.send('5')
    socket.send("42" + JSON.stringify(["VIEWING", this.discord.id]))
    interval = setInterval(() => {
      socket.send('2')
      sent2 = performance.now()
      if (interval) clearInterval(interval)
    }, info.pingInterval)
  })
  socket.on('close', async() => {
    this.bio.emit('debug', ' Websocket Connection Closed');
    this.connect()
    this.emit('reconnect')
  });
  socket.on('message', (message) => {
    const msg = message as string
    if (msg === '3probe') this.ws.ping = performance.now() - now
    else if (msg === '3') this.ws.ping = performance.now() - sent2
    if (['3probe', '3', '40'].includes(msg)) return
    this.emit('raw', msg)
    const [event, data]: [string, any] = JSON.parse(msg.substr(2))
    switch (event) {
      case 'TOTAL_VIEWING': this.emit('viewCountUpdate', data); break
      case 'PRESENCE': {
        data.user = this.discord
        const newPresence = new Presence(this.bio, data)
        const oldPresence = this.discord.presence
        this.discord.presence = newPresence
        this.emit('presenceUpdate', oldPresence, newPresence)
      }; break
      case 'PROFILE_UPDATE': {
        const oldProfile = {
          user: Object.assign({}, this.user),
          discord: this.discord
        }
        Object.assign(oldProfile, new EventEmitter())
        this._patch(data)
        this.emit('profileUpdate', oldProfile, this)
      }; break
      case 'BANNER_UPDATE': {
        if (!data) this.user.details.banner = null;
        this.emit('bannerUpdate', data)
      }; break
      //SOON tm
      case 'PROFILE_LIKE': {
        this.user.details.likes += 1
        this.emit('like', this.bio.profiles.get(data)?.discord || data)
      }; break
      case 'PROFILE_UNLIKED': {
        this.user.details.likes -= 1
        this.emit('unlike', this.bio.profiles.get(data)?.discord || data)
      }; break
      case 'PROFILE_UNLIKE': {
        this.user.details.likes -= 1
        this.emit('unlike', this.bio.profiles.get(data)?.discord || data)
      }; break
      default: console.error(`discord.bio: Received unknown event "${event}", event data follows:\n${data}`)
    }
  });
}
export = connect
