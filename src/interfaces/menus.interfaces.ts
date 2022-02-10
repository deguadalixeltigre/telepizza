import { Model } from "sequelize/types";

export interface IMenu extends Model {
    menuId: string;
    menuName: string;
}
