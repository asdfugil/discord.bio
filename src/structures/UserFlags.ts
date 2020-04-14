import { BitField } from 'discord.js'
class UserFlags extends BitField<string> {
    constructor(bits:number) {
        super(bits)
    }
    static FLAGS = {
        DISCORD_EMPLOYEE:1 << 0,
        DISCORD_PARTNER:1 << 1,
        HYPESQUAD_EVENTS:1 << 2,
        BUG_HUNTER_LEVEL_1 :1 << 3,
        HOUSE_BRAVERY:1 << 6,
        HOUSE_BRILLIANCE:1 << 7,
        HOUSE_BALANCE:1 << 8,
        EARLY_SUPPORTER:1 << 9,
        TEAM_USER:1 << 10,
        SYSTEM:1 << 12,
        BUG_HUNTER_LEVEL_2:1 << 14
    }
    static ALL = Object.values(UserFlags.FLAGS).reduce((all, p) => all | p, 0)
    static DEFAULT = 0
}
export = UserFlags