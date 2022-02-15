import { Schema, model } from "mongoose";
import { IHistory } from "../interfaces/history.interfaces";

const HistorySchema = new Schema({
    timestamp: { type: String, unique: true, required: true },
    label: { type: String, required: true },
    action: { type: String, required: true },
    labelId: { type: String, required: true },
    data: { type: String, required: true }
});

export const History = model<IHistory>("History", HistorySchema);