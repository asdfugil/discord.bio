import User from './structures/User'
import RawUser from './structures/RawUser'
import details from './endpoints/user/details'
import search from './endpoints/user/search'
import APIVersion from './endpoints/APIVersion'
import topLikes from './endpoints/topLikes'
import presence from './endpoints/user/presence'
import UserConnections from './structures/UserConnections'
import { UserFlags, ImageURLOptions, Collection, } from 'discord.js'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import DBioAPIError from './structures/DBioAPIError'
import ConnectionTypes from './structures/ConnectionTypes'
import Base from './structures/Base'
import RESTManager from './structures/RESTManager'
import { bioOptionsDefaults } from './util/Constants'
import Activity from './structures/Activity'
import Emoji from './structures/Emoji'
import HTTPRequestMethod from './structures/HTTPRequestMethod'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import PartialProfileSettings from './structures/PartialProfileSettings'
import ProfileSettings from './structures/ProfileSettings'
import RichPresenceAssets from './structures/RichPresenceAssets'
/**The main hub for interacting with the discord.bio API. */
export class Bio extends EventEmitter {
    /**Fetches the api version. */
    APIVersion: typeof APIVersion
    /**Fetch the top upvoted users, sorted by upvotes.*/
    topLikes: typeof topLikes
    @enumerable(false)
    bio: this
    //public on<K extends keyof BioEvents>(event: K, listener: (...args: BioEvents[K]) => void): this;  
      users: Base & {
        /**
         * Get user Details
         */
        details: typeof details,
        /**
         * Search for profiles on discord.bio,sorted by upvotes 
         */
        search: typeof search
        presence: typeof presence
    }
    /**The version of the library */
    version: string
    /**
     * REST Manager
     * @private
     */
    rest: RESTManager
    /**
     * @param baseURL - The API base URL
     */
    constructor(options: typeof bioOptionsDefaults = bioOptionsDefaults) {
        super()
        this.APIVersion = APIVersion
        this.topLikes = topLikes
        this.users = {
            bio: this,
            details: details,
            search: search,
            presence: presence
        }
        this.bio = this
        this.rest = new RESTManager(this,options.rest)
        this.version = require('../package.json').version
    }
}
export { User, RawUser, UserFlags, ImageURLOptions, DBioAPIError, ConnectionTypes, UserConnections, Collection, Base, Activity,Emoji,HTTPRequestMethod,Profile,PartialProfile,PartialProfileSettings,ProfileSettings,RichPresenceAssets }
