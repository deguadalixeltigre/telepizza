import { IHistory } from "../interfaces/history.interfaces";
import { History } from "../models/history.models";

export class HistoryService {
    public async create(history: IHistory) {
        try {
            const _history = new History(history);
            return _history.save();
        } catch (err) {
            return err;
        }
    }
}