import { IUser } from "./user";

export interface IAuth {
  email: string;
  password_hash: string;
}

export interface IRegisterData extends IUser {
  password?: string;
  email: string;
}
