import { DomainValidator } from "@/modules/@shared/domain/validator";
import { UserEntity } from "../user.entity";
import { Either, left, right } from "@/modules/@shared/logic";

export class YupUserValidator implements DomainValidator<UserEntity.Props>{
    validate(props: UserEntity.Props): Either<Error[], null> {



        return  right(null)
    }
}