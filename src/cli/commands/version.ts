import { Bio } from '../..'
const bio = new Bio()
export = function () { return bio.APIVersion().then(console.log) }