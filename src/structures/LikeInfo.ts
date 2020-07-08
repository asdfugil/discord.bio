import { Collection,Snowflake } from 'discord.js'
import PartialProfile from './PartialProfile'
type LikeInfo = {
  pageTotal:number
  users:Collection<Snowflake,PartialProfile>
}
export = LikeInfo