/**
 * Logout and invalidates the cookie
 */
async function logout(this:import("..").Bio):Promise<void> {
    this.api('/login','POST',{ cookie:this.cookie })
}
export = logout