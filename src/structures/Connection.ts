class Connection {
    /**Name of the user on this connection */
    name: string
    type: "BIO"
    /**The type of this connection (e.g. github)*/
    platform: string
    url: string | null
    constructor(data: any) {
        this.name = data.name
        this.type = data.type
        this.platform = data.platform
        switch (data.platform) {
            case 'instagram': this.url = 'https://instagram.com/' + data.name
            case 'snapchat': this.url = 'https://snapchat.com/' + data.name
            case 'linkedin': this.url = 'https://linkedin.com/' + data.name
            case 'telegram': this.url = 'https://t.me/' + data.name
            case 'tiktok': this.url = 'https://tiktok.com/@' + data.name
            case 'keybase': this.url = 'https://keybase.io/' + data.name
            case 'gitlab': this.url = 'https://gitlab.com/' + data.name
            case "github": this.url = "https://github.com/" + data.name
            case "youtube": this.url = "https://youtube.com/channel/" + data.name
            case "reddit": this.url = "https://reddit.com/u/" + data.name
            case "steam": this.url = "https://steamcommunity.com/profiles/" + data.name
            case "twitch": this.url = "https://www.twitch.tv/" + data.name
            case "twitter": this.url = "https://twitter.com/" + data.name
            case "spotify": this.url = "https://open.spotify.com/user/" + data.name
            case "xbox": this.url = "https://account.xbox.com/en-us/Profile?GamerTag=" + data.name
            case 'website': this.url = data.name
            //facebook,battlenet
            default: this.url = null
        }
    }
}
export = Connection