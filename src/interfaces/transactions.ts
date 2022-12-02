export interface ITransaction {
    id?: number;
    account_id: number;
    amount: number;
    date: Date;
    description: string;
}