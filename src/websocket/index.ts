import { client } from 'websocket'
import fetch from 'node-fetch'
import Profile from "../structures/Profile";
import { Activity, UserConnections, ProfileSettings } from '..';
import { performance } from 'perf_hooks'
import { headers } from '../util/Constants';
const socket = new client()
/**Connect to this profile's websocket */
async function connect(this: Profile) {
  this.ws.socket = socket
  socket.on('connectFailed', console.error)
  const info = await fetch('https://api.discord.bio/bio_ws/?EIO=3&transport=polling', {
    headers: {
      'user-agent': headers['user-agent'] as any,
    }
  }).then(res => res.text()).then(text => text.replace('96:0', '')).then(JSON.parse)
  socket.connect(`wss://api.discord.bio/bio_ws/?EIO=3&transport=websocket&sid=${info.sid}`)
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
          const newActivity = data ? new Activity(this.bio, data) : null
          const oldActivity = this.user.activity
          this.user.activity = newActivity
          this.emit('presenceUpdate', oldActivity, newActivity)
        }; break
        case 'PROFILE_UPDATE': {
          const { connections, settings } = data as {
            connections: UserConnections,
            settings: any
          }
          const oldUser = Object.assign({}, this.user)
          const oldProfile = {
            user: oldUser,
            discord: this.discord
          }
          this.user.userConnections = connections
          this.user.details = new ProfileSettings(settings)
          this.emit('profileUpdate', oldProfile, this)
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