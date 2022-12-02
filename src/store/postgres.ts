import pool from "../config/db";
import { QueryResultRow } from "pg";
import { E_TABLES, IQueryOptions } from "../interfaces/store";

export default {
  async list<T extends QueryResultRow>(
    table: E_TABLES,
    options?: IQueryOptions<T>,
  ): Promise<T[]> {
    let query = `SELECT * FROM ${table}`;
    if (options?.filter) {
      query += ` WHERE ${Object.keys(options.filter).map(
        (key) => `${key} = $1`,
      )}`;
    }
    const result = await pool.query<T>(
      query,
      Object.values(options?.filter ?? {}),
    );
    return result.rows;
  },

  async get<T>(table: E_TABLES, id: string | number, field = "id"): Promise<T> {
    let query = `SELECT * FROM ${table} WHERE ${field} = $1`;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  },

  async upsert<T extends object>(
    table: E_TABLES,
    data: T,
    pk: string = "id",
  ): Promise<T> {
    const keys = Object.keys(data);

    const indexes = keys.map((_, index) => `$${index + 1}`).join(",");
    const updateKeys = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `INSERT INTO ${table}(${keys.join(
      ",",
    )}) VALUES (${indexes}) ON CONFLICT (${pk}) DO UPDATE SET ${updateKeys} RETURNING *`;
    const result = await pool.query<T>(query, Object.values(data));
    return result.rows[0];
  },

  query<T extends object>(queryStr: string) {
    return pool.query<T>(queryStr);
  },

  remove(table: E_TABLES, id: string) {},
};
