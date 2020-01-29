export interface UserDataInterface {
    id: number,
    name: string,
    login: string,
    password: string,
    features: Array<string>
}

export interface UserPropInterface {
    id: number,
    name: string,
    login: string,
    password: string,
    admin:Boolean,
    getUserInfo: UserDataInterface
}

export interface CurrentUserInterface {
    getUserInfo: UserDataInterface
}
