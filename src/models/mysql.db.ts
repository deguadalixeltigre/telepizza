import { Sequelize } from 'sequelize';
// Modules
import { Menus } from "../models/menus.models";
import { MenuItems } from "../models/menu_items.models";
import { Categories } from "../models/categories.models";
import { CategoryItems } from "../models/category_items.models";
import { Users } from "../models/users.models";
import { Devices } from "../models/devices.models";
// Utils
import { Logger } from "../utils/logger";

export class mysqldb {

    public sequelize: any;
    public db: any = {};

    constructor(private strConn: string, private logger: Logger) {
        // Init and connect database
        this.initDatabase();
        this.dbConnect();
    }

    private initDatabase() {
        this.sequelize = new Sequelize(this.strConn);
        this.db = {
            Sequelize: Sequelize,
            sequelize: this.sequelize,
            Menus: new Menus(this.sequelize),
            MenuItems: new MenuItems(this.sequelize),
            Categories: new Categories(this.sequelize),
            CategoryItems: new CategoryItems(this.sequelize),
            Users: new Users(this.sequelize),
            Devices: new Devices(this.sequelize)
        };                
    }

    public async dbConnect() {
        this.sequelize.authenticate().then(() => {
            this.logger.writeSysLog('Connection has been established successfully.');
            // Set associations
            this.db.Menus.model.hasMany(this.db.MenuItems.model, { foreignKey: 'menuId', sourceKey: 'menuId', as: 'items' });
            this.db.MenuItems.model.belongsTo(this.db.Menus.model, { foreignKey: 'menuId', sourceKey: 'menuId', as: 'items' });
            this.db.MenuItems.model.hasMany(this.db.Categories.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'categories' });
            this.db.Categories.model.belongsTo(this.db.MenuItems.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'categories' });
            this.db.Categories.model.hasMany(this.db.CategoryItems.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'items' });
            this.db.CategoryItems.model.belongsTo(this.db.Categories.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'items' });
        
        }).catch((err: any) => {
            this.logger.writeSysLog('Unable to connect to the database: ' + err.message);
        });
    }
}
