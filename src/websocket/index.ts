import { client } from 'websocket'
import fetch from 'node-fetch'
import Profile from "../structures/Profile";
import { Activity, UserConnections, ProfileSettings, ConnectionTypes } from '..';
import { performance } from 'perf_hooks'
import { headers,bioOptionsDefaults } from '../util/Constants';
import Presence from '../structures/Presence';
import { runInThisContext } from 'vm';
const socket = new client()
/**Connect to this profile's websocket */
async function connect(this: Profile) {
  this.ws.socket = socket
  socket.on('connectFailed', console.error)
  const info = await fetch(`https://${bioOptionsDefaults.ws.gateway}/?EIO=3&transport=polling`, {
    headers: {
      'user-agent': headers['user-agent'] as any,
    }
  }).then(res => res.text()).then(text => text.replace('96:0', '')).then(JSON.parse)
  socket.connect(`wss://${bioOptionsDefaults.ws.gateway}/bio_ws/?EIO=3&transport=websocket&sid=${info.sid}`)
  socket.on('connect', connection => {
    this.emit('connect')
    this.once('viewCountUpdate', count => this.emit('subscribe', count))
    connection.on('close', () => {
      this.bio.emit('debug', ' Websocket Connection Closed');
      this.emit('close')
    });
    let sent2: number
    setInterval(() => {
      connection.send('2')
      sent2 = performance.now()
    }, info.pingInterval)
    //init
    const now = performance.now()
    connection.send('2probe')
    connection.send('5')
    connection.on('message', (message) => {
      if (message.type !== 'utf8') return
      const msg = message.utf8Data as string
      if (msg === '3probe') this.ws.ping = performance.now() - now
      else if (msg === '3') this.ws.ping = performance.now() - sent2
      if (['3probe', '3', '40'].includes(msg)) return
      this.emit('raw', msg)
      const [event, data]: [string, any] = JSON.parse(msg.substr(2))
      switch (event) {
        case 'TOTAL_VIEWING': this.emit('viewCountUpdate', data); break
        case 'PRESENCE': {
          data.user = this.discord
          const newPresence = new Presence(this.bio,data)
          const oldPresence = this.discord.presence
          this.discord.presence = newPresence
          this.emit('presenceUpdate',oldPresence,newPresence)
        }; break
        case 'PROFILE_UPDATE': {
          const oldProfile = Object.assign({},this)
          this._patch(data)
          this.emit('profileUpdate',oldProfile,this)
        }; break
        case 'BANNER_UPDATE': {
          if (!data) this.user.details.banner = null;
          this.emit('bannerUpdate', data)
        }
        default: console.error(`Received unknown event "${event}"`)
      }
    });
    connection.send("42" + JSON.stringify(["VIEWING", this.discord.id]))
  })
}
export = connect