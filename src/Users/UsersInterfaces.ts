export interface UserDataInterface {
  id: number;
  name: string;
  login: string;
  features: Array<string>;
}

export interface UserPropInterface extends UserDataInterface {
  admin: Boolean;
  getUserInfo: UserDataInterface;
}

export interface CurrentUserInterface {
  getUserInfo: UserDataInterface;
}

export interface PasswordEditInterface {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}
