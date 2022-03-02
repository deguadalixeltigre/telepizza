import { Document } from "mongoose";

export interface ITransaction extends Document {
    timestamp: string;
    label: string;
    action: string;
    labelId: string;
    data: string;
}
