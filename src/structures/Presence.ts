import Base from './Base'
import { ClientPresenceStatus, PresenceStatus } from 'discord.js'
import { Bio, Activity, User } from '..'
/**Represents a user's presence. */
class Presence extends Base {
  /**The activity of this presence */
  activity: Activity | null
  /**The user of this presence */
  user: User
  /**The status of this presence */
  status: PresenceStatus
  constructor(bio: Bio, data: any) {
    super(bio)
    this.activity = data.activity || null
    this.user = data.user
    this.status = data.status || 'offline'
  }
  equals(presence: Presence): boolean {
    return this === presence ||
      (presence &&
        this.status === presence.status &&
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