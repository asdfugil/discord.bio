import { Bio } from '..'
/**
 * Anything that has a bio property that refers to a Bio instance
 */
class Base {
    bio:Bio
    constructor(bio:Bio) {
        this.bio = bio
    }
}
export = Base