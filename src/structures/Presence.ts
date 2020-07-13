import Base from './Base'
import { ClientPresenceStatus, PresenceStatus } from 'discord.js'
import { Bio, Activity, User } from '..'
/**Represents a user's presence. */
class Presence extends Base {
  /**The devices this presence is on */
  clientStatus: {
    /**The current presence in the web application */
    web?: ClientPresenceStatus,
    /*The current presence in the desktop application*/
    desktop?: ClientPresenceStatus,
    /**The current presence in the mobile application */
    mobile?: ClientPresenceStatus
  }
  /**The activity of this presence */
  activity: Activity | null
  /**The user of this presence */
  user: User
  /**The status of this presence */
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