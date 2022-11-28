import store from "../../store/postgres";
import bcrypt from "bcrypt";
import { IUser } from "../../interfaces/user";
import auth from "../../auth";
import { E_TABLES } from "../../interfaces/store";
import { IAuth, IRegisterData } from "../../interfaces/auth";
const AUTH_TABLE = E_TABLES.AUTH;
const CLIENT_TABLE = E_TABLES.CLIENTS;

export default {
  async login(email: string, password: string) {
    const authData = (
      await store.list<IAuth>(AUTH_TABLE, { filter: { email } })
    )[0];

    if (!authData) {
      throw Error("Contrasena/usuario invalido.");
    }

    const isEqual = await bcrypt.compare(password, authData.password_hash);

    if (isEqual) {
      const clientData = (
        await store.list<IUser>(CLIENT_TABLE, {
          filter: { email: authData.email },
        })
      )[0];
      return { user: clientData, token: auth.sign(clientData) };
    } else {
      throw Error("Contrasena/usuario invalido.");
    }
  },

  async register(user: IRegisterData) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password as string, salt);
      user.password = hash;

      await store.upsert<IAuth>(AUTH_TABLE, {
        email: user.email,
        password_hash: hash,
      });
      const clientData = await store.upsert<IUser>(
        CLIENT_TABLE,
        new IUser(user),
      );
      return { user: clientData, token: auth.sign(clientData) };
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },

  // async updateProfile(user: IUser) {
  //   try {
  //     const updatedUser = await store
  //       .upsert<IUser>(TABLE, user)
  //       .select("_id email name username profileImg");
  //     return updatedUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  listRegistries(filter?: any) {
    return store.list(AUTH_TABLE, { filter });
  },

  // getRegistry(id: string) {
  //   return store.get(TABLE, id);
  // },

  // async upsertRegistry(data: IUser) {
  //   const authData: IUser = {
  //     _id: data._id,
  //   };

  //   if (data.username) {
  //     authData.username = data.username;
  //   }

  //   if (data.password) {
  //     authData.password = await bcrypt.hash(data.password, 10);
  //   }

  //   return store.upsert(TABLE, authData);
  // },
};
