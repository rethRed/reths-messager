import { DomainValidator } from "@/modules/@shared/domain/validator";
import { UserEntity } from "../user.entity";
import { YupUserValidator } from "./yup-user-validator";

export class UserValidatorFactory {
    static create(): DomainValidator<YupUserValidator.ValidateFields> {
        return new YupUserValidator()
    }
}