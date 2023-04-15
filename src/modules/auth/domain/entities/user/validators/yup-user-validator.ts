import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { UserEntity } from "../user.entity";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidUsernameFormatError, InvalidUsernameLengthError, UsernameNotProvidedError } from "../errors";

export class YupUserValidator extends YupValidatorProvider implements DomainValidator<UserEntity.Props>{

    schema = yup.object({
        username: yup.string()
        .typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameFormatError()))
        .required(YupErrorAdapter.toYupFormat(new UsernameNotProvidedError()))
        .min(5).typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError(5,50)))
        .max(50).typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError(5,50)))
    });

    validate(props: UserEntity.Props): Either<Error[], null> {
        const errors: Error[] = []

        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) errors.push(...schemaValid.value)
        if(errors.length > 0) return left(errors)
        return right(null)
    }
}