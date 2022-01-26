import { Bio } from "..";
import enumerable from "../util/enumerable";
/**Anything that has a bio property */
class Base {
  @enumerable(false)
  /**The bio instance that instantiated this */
  bio:Bio
  constructor(bio:Bio) {
    this.bio = bio
  }
}
export = Base