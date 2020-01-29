interface User {
    id: number,
    name: string,
    login: string,
    password: string,
}
export interface UserDataInterface extends User{
    features: Array<string>
}

export interface UserPropInterface extends User{
    admin:Boolean,
    getUserInfo: UserDataInterface
}

export interface CurrentUserInterface {
    getUserInfo: UserDataInterface
}
