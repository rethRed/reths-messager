import Crypto from "crypto"

export abstract class BaseEvent {
    id: string;
    schemaVersion: string = "1.0.0"
    dateTimeOccurred: Date = new Date();
    eventName: string;

    abstract readonly payload: any;

    constructor() {
        this.id = Crypto.randomUUID()
        this.eventName = this.constructor.name;
    }


    format(): Event.GetPayload {
        return {
            id: this.id,
            eventName: this.eventName,
            schemaVersion: this.schemaVersion,
            dateTimeOccurred: this.dateTimeOccurred,
            payload: this.payload
        };
    }
}

export namespace Event {
    export type GetPayload = {
        id: string 
        eventName: string
        schemaVersion: string
        dateTimeOccurred: Date,
        payload: any
    }
}