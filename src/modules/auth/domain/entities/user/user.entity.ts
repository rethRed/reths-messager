import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UserValidatorFactory } from "./validators";

export class UserEntity extends BaseEntity<UserEntity.Props> {
    private constructor(props: UserEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: UserEntity.Input, id?: string): UserEntity.Output{

        const userValidator = UserValidatorFactory.create()
        const validatedUser = userValidator.validate({
            ...input
        })
        if(validatedUser.isLeft()) return left(validatedUser.value)
        const userEntity = new UserEntity({
            ...input
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
        return this.props.email
    }
    get password(): string{
        return this.props.password
    }
}

export namespace UserEntity {
    
    export type Input = {
        username: string
        email: string
        password: string
    }
    
    export type Props = {
        username: string
        email: string
        password: string
    }

    export type Output = Either<Error[], UserEntity>
    export type UserEntityPropsJson = Omit<Input, "password"> & { id: string, password: string }
}