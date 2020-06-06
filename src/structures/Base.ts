import { Bio } from '..'
import enumerable from '../util/enumerable'
/**
 * Anything that has a bio property that refers to a Bio instance
 */
class Base {
    @enumerable(false)
    bio:Bio
    constructor(bio:Bio) {
        this.bio = bio
    }
}
export = Base