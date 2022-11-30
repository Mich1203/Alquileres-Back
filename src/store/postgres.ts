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
    console.log(query);
    const result = await pool.query<T>(
      query,
      Object.values(options?.filter ?? {}),
    );
    return result.rows;
  },

  async get<T>(table: E_TABLES, id: string | number): Promise<T> {
    let query = `SELECT * FROM ${table} WHERE id = $1`;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  },

  async upsert<T extends object>(table: E_TABLES, data: T): Promise<T> {
    const keys = Object.keys(data);

    const indexes = keys.map((_, index) => `$${index + 1}`).join(",");
    const updateKeys = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `INSERT INTO ${table}(${keys.join(
      ",",
    )}) VALUES (${indexes}) ON CONFLICT (id) DO UPDATE SET ${updateKeys} RETURNING *`;
    console.log(query);
    const result = await pool.query<T>(query, Object.values(data));
    return result.rows[0];
  },

  remove(table: E_TABLES, id: string) {},
};
