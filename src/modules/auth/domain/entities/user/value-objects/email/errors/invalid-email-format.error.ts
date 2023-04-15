export class InvalidEmailFormatError extends Error {
    constructor(){
        super("An invalid email format was provided")
        this.name = this.constructor.name
    }
}