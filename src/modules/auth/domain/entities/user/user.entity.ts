import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left } from "@/modules/@shared/logic";

export class UserEntity extends BaseEntity<UserEntity.Props> {
    private constructor(props: UserEntity.Props, id?: string) {
        super(props, id)
    }

    static create(): UserEntity.Output{



        return left([])
    }


    toJSON(): UserEntity.UserEntityPropsJson {
        return {
            id: this.id,
            username: this.username
        }
    }

    get username(): string{
        return this.props.username
    }
}

export namespace UserEntity {
    
    export type Input = {
        username: string
    }
    
    export type Props = {
        username: string
    }

    export type Output = Either<Error[], UserEntity>
    export type UserEntityPropsJson = Input & { id: string }
    
}