import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { EmailNotProvidedError, InvalidEmailFormatError, InvalidEmailLengthError } from "../errors";

export class YupEmailValidator extends YupValidatorProvider implements DomainValidator<string>{

    schema = yup.string()
        .typeError(YupErrorAdapter.toYupFormat(new InvalidEmailFormatError()))
        .required(YupErrorAdapter.toYupFormat(new EmailNotProvidedError()))
        .email(YupErrorAdapter.toYupFormat(new InvalidEmailFormatError()))
        .max(255).typeError(YupErrorAdapter.toYupFormat(new InvalidEmailLengthError(255)))

    validate(email: string): Either<Error[], null> {

        const schemaValid = this.validateSchema(email)
        if(schemaValid.isLeft()) left(schemaValid.value)
        return right(null)
    }
}