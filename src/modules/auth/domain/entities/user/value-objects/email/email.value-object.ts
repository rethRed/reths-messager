import { Either, left, right } from "@/modules/@shared/logic";
import { EmailValidatorFactory } from "./validators";

export class EmailValueObject {
    
    private constructor(private email: string){

    }
    get value(): string {
        return this.email;
    }

    create(email: string): Either<Error[], EmailValueObject>{

        const emailValidator = EmailValidatorFactory.create()
        const emailValid = emailValidator.validate(email)
        if(emailValid.isLeft()) return left(emailValid.value)

        const emailValueObject = new EmailValueObject(email)
        return right(emailValueObject) 
    }

}