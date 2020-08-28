import { Collection,Snowflake } from 'discord.js'
import PartialProfile from './PartialProfile'
/**Information about the top profiles. */
type TopInfo = {
  /**Total number of pages */
  pageTotal:number
  /**Users in this oage */
  users:Collection<Snowflake,PartialProfile>
}
export = TopInfo