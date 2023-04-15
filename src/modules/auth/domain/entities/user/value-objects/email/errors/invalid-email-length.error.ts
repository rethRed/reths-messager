export class InvalidEmailLengthError extends Error {
    constructor( max: number = 255){
        super(`email length must be until ${max} characters`)
        this.name = this.constructor.name
    }
}