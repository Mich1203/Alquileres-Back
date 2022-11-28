import { IUser } from "../../src/interfaces/user";

declare global {
  declare namespace Express {
    export interface Request {
      user?: IClient;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends IUser {}
  }
}
