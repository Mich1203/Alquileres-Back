export enum E_TABLES {
  AUTH = "authentication",
  CLIENTS = "clients",
  PLACES = "places",
  HOSTS = "hosts",
  ACCOUNTS = "accounts",
  TRANSACTIONS = "transactions",
}

interface IPopulateOption<T> {
  field: keyof T;
  select: string;
}

interface ITermOption {
  field: string;
  term: string;
}
export interface IQueryOptions<T> {
  sort?: string;
  filter?: Partial<T>;
  populate?: IPopulateOption<T>[];
  search?: ITermOption;
}
