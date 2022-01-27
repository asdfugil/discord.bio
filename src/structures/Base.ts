import { Bio } from "..";
import enumerable from "../util/enumerable";
/**Anything that has a bio property */
class Base {
  /**The bio instance that instantiated this */
  @enumerable(false)
  bio:Bio
  constructor(bio:Bio) {
    this.bio = bio
  }
}
export = Base