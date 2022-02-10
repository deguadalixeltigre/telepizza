import { v4 as uuidv4 } from "uuid";
import { Utils } from "../utils/utils";

export class CategoriesService {
    
    public utils = new Utils();
    
    constructor(private db: any) {
    }

    public async createCategory(category: any) {
        try {
            category.categoryId = uuidv4();
            const result = await this.db.Categories.model.create(category);
            return result;
        } catch (err) {
            return err;
        }
    }

    public async createCategoryItem(categoryItem: any) {
        try {
            categoryItem.categoryItemId = uuidv4();
            const result = await this.db.CategoryItems.model.create(categoryItem);
            return result;
        } catch (err) {
            return err;
        }
    }

    public async updateCategory(category: any) {
        try {
            let fields: any = [];
            if (!this.utils.isNull(category.categoryName)) {
                fields["categoryName"] = category.categoryName;
            } 
            if (!this.utils.isNull(category.description)) {
                fields["description"] = category.description;
            } 
            // Update record
            await this.db.Categories.model.update(fields, { where: { categoryId: category.categoryId }, raw: true, returning: true });
            // Return updated record
            return await this.findCategory(category.categoryId);
        } catch (err) {
            return err;
        }
    }

    public async updateCategoryItem(categoryItem: any) {
        try {
            let fields: any = [];
            if (!this.utils.isNull(categoryItem.categoryItemName)) {
                fields["categoryItemName"] = categoryItem.categoryItemName;
            }
            if (!this.utils.isNull(categoryItem.description)) {
                fields["description"] = categoryItem.description;
            }
            if (!isNaN(categoryItem.price)) {
                fields["price"] = categoryItem.price;
            }
            if (!this.utils.isNull(categoryItem.categoryId)) {
                fields["categoryId"] = categoryItem.categoryId;
            }
            // Update record
            await this.db.CategoryItems.model.update(fields, { where: { categoryItemId: categoryItem.categoryItemId, categoryId: categoryItem.categoryId }, raw: true, returning: true });
            // Return updated record
            return await this.findCategoryItem(categoryItem.categoryItemId);
        } catch (err) {
            return err;
        }
    }

    public async findCategory(id: string) {
        try {
            return await this.db.Categories.model.findOne({
                where: {
                    categoryId: id
                },
                include: [
                    {
                        model: this.db.CategoryItems.model,
                        as: 'items'
                    }
                ]
            });
        } catch (err) {
            return err;
        }
    }

    public async findAll() {
        try {
            return await this.db.Categories.model.findAll({
                include: [
                    {
                        model: this.db.CategoryItems.model,
                        as: 'items'
                    }
                ]                
            });
        } catch (err) {
            return err;
        }
    }

    public async findCategoryItem(id: string) {
        try {
            return await this.db.CategoryItems.model.findCategory({
                where: {
                    categoryItemId: id
                }
            });
        } catch (err) {
            return err;
        }
    }

    public async deleteCategory(id: string) {
        try {
            return await this.db.Categories.model.destroy({
                where: {
                    categoryId: id
                },
                include: [
                    {
                        model: this.db.CategoryItems.model,
                        as: 'items'
                    }
                ]
            });
        } catch (err) {
            return err;
        }
    }

    public async deleteCategoryItem(id: string, itemId: string) {
        try {
            return await this.db.CategoryItems.model.destroy({
                where: {
                    categoryItemId: itemId,
                    categoryId: id
                }
            });
        } catch (err) {
            return err;
        }
    }
}
