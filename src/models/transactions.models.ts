import { Schema, model } from "mongoose";
import { ITransaction } from "../interfaces/transactions.interfaces";

const TransactionSchema = new Schema({
    timestamp: { type: String, unique: true, required: true },
    label: { type: String, required: true },
    action: { type: String, required: true },
    labelId: { type: String, required: true },
    data: { type: String, required: true }
});

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);