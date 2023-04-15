export class UsernameNotProvidedError extends Error {
    constructor(){
        super("Please provide a username.")
        this.name = this.constructor.name
    }
}