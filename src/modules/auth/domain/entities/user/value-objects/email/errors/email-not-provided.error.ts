export class EmailNotProvidedError extends Error {
    constructor(){
        super("Please provide a email")
        this.name = this.constructor.name
    }
}