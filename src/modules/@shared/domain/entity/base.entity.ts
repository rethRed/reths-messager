import Crypto from "crypto";

export class BaseEntity {
    private _id: string
    private _createdAt: Date

    constructor(id?: string, createdAt?: Date) {
        this._id = id || Crypto.randomUUID()
        this._createdAt = createdAt || new Date()
    }

    get id(): string {
        return this._id
    }

    get createdAt(): Date {
        return this._createdAt
    }
}