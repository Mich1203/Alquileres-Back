import store from "../../store/postgres";
import { E_TABLES } from "../../interfaces/store";
import { IPlace } from "../../interfaces/places";
const TABLE = E_TABLES.PLACES;

export default {
  async listRegistries(filter?: any) {
    return (await store.list<IPlace>(TABLE, { filter })).map(
      (rec) => new IPlace(rec),
    );
  },

  async getRegistry(id: number) {
    const result = await store.get<IPlace>(TABLE, id);
    return result ? new IPlace(result) : result;
  },

  async upsertRegistry(data: IPlace) {
    const result = await store.upsert(TABLE, new IPlace(data));
    return result ? new IPlace(result) : result;
  },
};
