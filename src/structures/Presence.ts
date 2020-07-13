import Base from './Base'
import { ClientPresenceStatus, PresenceStatus } from 'discord.js'
import { Bio, Activity, User } from '..'
import Profile from './Profile'
class Presence extends Base {
  clientStatus: {
    web?: ClientPresenceStatus,
    desktop?: ClientPresenceStatus,
    mobile?: ClientPresenceStatus
  }
  activity: Activity | null
  user: User
  status: PresenceStatus
  constructor(bio: Bio, data: any) {
    super(bio)
    this.clientStatus = data.status || {}
    this.activity = data.activity || null
    this.user = data.user
    this.status = 'offline'
    const statuses = Object.values(data.status || {})
    if (statuses.includes('online')) this.status = 'online'
    else if (statuses.includes('dnd')) this.status = 'dnd'
    else if (statuses.includes('idle')) this.status = 'idle'
  }
  equals(presence: Presence): boolean {
    return this === presence ||
      (presence &&
        this.status === presence.status &&
        this.clientStatus.web === presence.clientStatus.web &&
        this.clientStatus.mobile === presence.clientStatus.mobile &&
        this.clientStatus.desktop === presence.clientStatus.desktop &&
        ((): boolean => {
          if (this.activity instanceof Activity &&
            presence.activity instanceof Activity)
            return this.activity.equals(presence.activity);
            //Possibly:
            //Both are null
            //One of the are null
          else if (this.activity === presence.activity) return true //Both are null
          return false //One of them are null
        })()
      )
  }
}
export = Presence