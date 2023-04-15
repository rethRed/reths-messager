import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupEmailValidator } from "./yup-email-validator";


export class EmailValidatorFactory {
    static create(): DomainValidator<string> {
        return new YupEmailValidator()
    }
}