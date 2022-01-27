/**Represents a connection shown on discord.bio */
class Connection {
    /**Name of the user on this connection */
    name: string
    /**The type of this connection (e.g. github)*/
    type: string
    platform: "BIO"
    /**URL to this connection, if there is one*/
    url: string | null
    constructor(data: any) {
        this.name = data.name
        this.type = data.type
        this.platform = data.platform
        switch (data.type) {
            case 'instagram': this.url = 'https://instagram.com/' + data.name; break
            case 'snapchat': this.url = 'https://snapchat.com/' + data.name; break
            case 'linkedin': this.url = 'https://linkedin.com/' + data.name; break
            case 'telegram': this.url = 'https://t.me/' + data.name; break
            case 'tiktok': this.url = 'https://tiktok.com/@' + data.name; break
            case 'keybase': this.url = 'https://keybase.io/' + data.name; break
            case 'gitlab': this.url = 'https://gitlab.com/' + data.name; break
            case "github": this.url = "https://github.com/" + data.name; break
            case "youtube": this.url = "https://youtube.com/channel/" + data.name; break
            case "reddit": this.url = "https://reddit.com/u/" + data.name; break
            case "steam": this.url = "https://steamcommunity.com/profiles/" + data.name; break
            case "twitch": this.url = "https://www.twitch.tv/" + data.name; break
            case "twitter": this.url = "https://twitter.com/" + data.name; break
            case "spotify": this.url = "https://open.spotify.com/user/" + data.name; break
            case "xbox": this.url = "https://account.xbox.com/en-us/Profile?GamerTag=" + data.name; break
            case 'website': this.url = data.name; break
            //facebook,battlenet
            default: this.url = null
        }
    }
}
export = Connection
