import store from "../../store/postgres";
import { E_TABLES } from "../../interfaces/store";
import { IAccount } from "../../interfaces/account";
import { ITransaction } from "../../interfaces/transactions";
const TABLE = E_TABLES.ACCOUNTS;
const TRX_TABLE = E_TABLES.TRANSACTIONS;

export default {
  async listRegistries(filter?: any) {
    return (await store.list<IAccount>(TABLE, { filter })).map(
      (rec) => new IAccount(rec),
    );
  },

  async getRegistry(id: number) {
    const result = await store.get<IAccount>(TABLE, id);
    const transactions = await store.list<ITransaction>(TRX_TABLE, {
      filter: { account_id: result.id },
    });
    return result
      ? {
          account: new IAccount(result),
          transactions,
        }
      : result;
  },

  async getRecordByUser(userId: string) {
    const result = await store.get<IAccount>(TABLE, userId, "client_id");
    const transactions = await store.list<ITransaction>(TRX_TABLE, {
      filter: { account_id: result.id },
    });
    return result
      ? {
          account: new IAccount(result),
          transactions,
        }
      : result;
  },

  async upsertRegistry(data: IAccount) {
    const result = await store.upsert(TABLE, new IAccount(data));
    return result ? new IAccount(result) : result;
  },

  async modifyBalance(accountId: number, data: number, description?: string) {
    const { rows, rowCount } = await store.query<IAccount>(
      `UPDATE accounts SET balance = balance ${data < 0 ? "-" : "+"} ${Math.abs(
        data,
      )} WHERE id = ${accountId} RETURNING *`,
    );

    if (rowCount > 0) {
      if (!description) description = data < 0 ? "DEBITO" : "CREDITO";
      const account = new IAccount(rows[0]);
      account.id &&
        (await store.upsert<ITransaction>(TRX_TABLE, {
          account_id: account.id,
          amount: Math.abs(data),
          description,
          date: new Date(),
        }));
      const transactions = await store.list<ITransaction>(TRX_TABLE, {
        filter: { account_id: account.id },
      });
      return { account, transactions };
    }
    return null;
  },
};
