async function billing(this:import('..').Bio):Promise<any> {
    return this.api('/billing','GET',{ cookie:this.cookie })
}
export = billing