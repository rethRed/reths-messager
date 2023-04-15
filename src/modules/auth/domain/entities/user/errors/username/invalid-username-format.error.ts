export class InvalidUsernameFormatError extends Error {
    constructor(){
        super("An invalid username format was provided")
        this.name = this.constructor.name
    }
}