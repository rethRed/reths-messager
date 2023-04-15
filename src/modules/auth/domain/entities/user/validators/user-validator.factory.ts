import { DomainValidator } from "@/modules/@shared/domain/validator";
import { UserEntity } from "../user.entity";
import { YupUserValidator } from "./yup-user-validator";

export class UserValidatorFactory {
    static create(): DomainValidator<UserEntity.Props> {
        return new YupUserValidator()
    }
}