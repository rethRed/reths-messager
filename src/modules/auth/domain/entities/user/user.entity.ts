import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UserValidatorFactory } from "./validators";
import { EmailValueObject } from "./value-objects";

export class UserEntity extends BaseEntity<UserEntity.Props> {
    private constructor(props: UserEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: UserEntity.Input, id?: string): UserEntity.Output{
        const errors: Error[] = []

        const emailValueObject = EmailValueObject.create(input.email)
        if(emailValueObject.isLeft()) errors.push(...emailValueObject.value)
        
        const userValidator = UserValidatorFactory.create()
        const validatedUser = userValidator.validate({
            ...input
        })
        if(validatedUser.isLeft()) errors.push(...validatedUser.value)
        
        if(errors.length > 0) return left(errors)

        const userEntity = new UserEntity({
            ...input,
            password: "",
            email: emailValueObject.value as EmailValueObject
        }, id)

        return right(userEntity)
    }


    toJSON(): UserEntity.UserEntityPropsJson {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
        }
    }

    get username(): string{
        return this.props.username
    }
    get email(): string{
        return this.props.email.value
    }
    get password(): string{
        return this.props.password
    }
}

export namespace UserEntity {
    
    export type Input = {
        username: string
        email: string
        password: {
            value: string
            isHashed?: boolean
        }
    }
    
    export type Props = {
        username: string
        email: EmailValueObject
        password: string
    }

    export type Output = Either<Error[], UserEntity>
    export type UserEntityPropsJson = Omit<Input, "email" | "password"> & { id: string, email: string, password: string }
}