export class IAccount {
  id?: number;
  balance: number;
  client_id?: string;

  constructor({ id, balance, client_id }: IAccount) {
    this.id = id;
    this.balance = balance;
    this.client_id = client_id;
  }
}
