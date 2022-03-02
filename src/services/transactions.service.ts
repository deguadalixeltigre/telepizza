import { ITransaction } from "../interfaces/transactions.interfaces";
import { Transaction } from "../models/transactions.models";

export class TransactionsService {
    public async create(transaction: ITransaction) {
        try {
            const _transaction = new Transaction(transaction);
            return _transaction.save();
        } catch (err) {
            return err;
        }
    }
}