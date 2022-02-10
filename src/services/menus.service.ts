import { Utils } from "../utils/utils";

export class MenusService {
    
    public utils = new Utils();
    
    constructor(private db: any) {
    }

    public async create(menu: any) {
        try {            
        } catch (err) {
            return err;
        }
    }

    public async delete(id: string) {
        try {            
        } catch (err) {
            return err;
        }
    }


    public async findOne(id: string) {
        try {
            return await this.db.Menus.model.findOne({
                where: {
                    menuId: id
                },
                include: [
                    {
                        exclude: ["menuId", "categoryId"], 
                        model: this.db.MenuItems.model,
                        as: 'items',
                        include: [
                            {
                                model: this.db.Categories.model,
                                as: 'categories',
                                include: [
                                    {
                                        model: this.db.CategoryItems.model,
                                        as: 'items'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            return err;
        }
    }

    public async findAll() {
        try {
            return await this.db.Menus.model.findAll({
                include: [
                    {
                        exclude: ["menuId", "categoryId"], 
                        model: this.db.MenuItems.model,
                        as: 'items',
                        include: [
                            {
                                model: this.db.Categories.model,
                                as: 'categories',
                                include: [
                                    {
                                        model: this.db.CategoryItems.model,
                                        as: 'items'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            return err;
        }
    }
}
