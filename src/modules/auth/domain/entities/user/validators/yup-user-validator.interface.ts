import { DomainValidator, YupErrorAdapter } from "@/modules/@shared/domain/validator";
import { UserEntity } from "../user.entity";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidUsernameFormatError, InvalidUsernameLengthError, UsernameNotProvidedError } from "../errors";

export class YupUserValidator implements DomainValidator<UserEntity.Props>{

    schema = yup.object({
        username: yup.string()
        .typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameFormatError()))
        .required(YupErrorAdapter.toYupFormat(new UsernameNotProvidedError()))
        .min(5).typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError(5,50)))
        .max(50).typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError(5,50)))
    });

    validate(props: UserEntity.Props): Either<Error[], null> {
        try{
            this.schema.validateSync(props, { abortEarly: false })

            return  right(null)
        }catch(err){
            const error = err as yup.ValidationError
            return left(error.errors.map(err => { return YupErrorAdapter.toDomainFormat(err)}))
        }
    }
}