export interface UserDataInterface {
    id: number,
    name: string,
    login: string,
    password: string,
    isAdmin: boolean
}

export interface UserPropInterface {
    id: number,
    name: string,
    login: string,
    password: string,
    isAdmin: boolean,
    getUserInfo: UserDataInterface
}

export interface CurrentUserInterface {
    getUserInfo: UserDataInterface
}
