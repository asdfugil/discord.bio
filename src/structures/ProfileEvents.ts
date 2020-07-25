// Use corr. websocket event names if there is
const enum ProfileEvents {
  CONNECT = 'connect',
  SUBSCRIBE = 'subscribe',
  TOTAL_VIEWING = 'viewCountUpdate',
  PRESENCE = 'presenceUpdate',
  PROFILE_UPDATE = 'profileUpdate',
  BANNER_UPDATE = 'bannerUpdate',
  PROFILE_LIKE = 'like',
  PROFILE_UNLIKE = 'unlike',
  CLOSE = 'close'
}
export = ProfileEvents