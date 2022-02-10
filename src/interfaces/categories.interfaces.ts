import { Model } from "sequelize/types";

export interface ICategory extends Model {
    categoryId: string;
    categoryName: string;
    description: string;
}

export interface ICategoryItem extends Model {
    categoryItemId: string;
    categoryItemName: string;
    description: string;
    categoryId: string;
    price: number;
}
