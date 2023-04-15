import { UserEntity } from "./user.entity"


type SutTypes = {
    sut: UserEntity
    props: UserEntity.Props
}

const makeSut = (): SutTypes => {
    const props: UserEntity.Props = {
        username: "any_username",
        email: "any_mail@gmail.com",
        password: "any_password",
    }
    const sut = UserEntity.create(props)
    if(sut.isLeft()) throw sut.value[0]
    
    return {
        sut: sut.value,
        props
    } 
}

describe("test user", () => {

    it("Should create an user entity", () => {
        const { props } = makeSut()

        const sut = UserEntity.create(props, "any_id")
        if(sut.isLeft()) throw sut.value[0]

        expect(sut.value.toJSON()).toEqual({
            id: "any_id",
            username: props.username,
            email: props.email,
            password: props.password
        })
    })

    it("Should", () => {
        const { props } = makeSut()

        const sut = UserEntity.create({
            ...props,
            username: {} as string
        }, "any_id")

        if(sut.isLeft()){
            console.log(sut.value[0].name)
        }

    })
})