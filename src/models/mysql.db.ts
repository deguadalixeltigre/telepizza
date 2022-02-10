import { Sequelize } from 'sequelize';
// Local imports
import { Menus } from "../models/menus";
import { MenuItems } from "../models/menu_items";
import { Categories } from "../models/categories";
import { CategoryItems } from "../models/category_items";
import { SysLogsService } from "../services/syslogs.service";
import { SysLogs } from "../models/syslogs.model";
import { Utils } from "../utils/utils";

export class mysqldb {
    public sequelize: any;
    public db: any = {};
    public utils: Utils;
    constructor(private strConn: string, private sysLogSrv: SysLogsService) {
        this.utils = new Utils();
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
            CategoryItems: new CategoryItems(this.sequelize)
        };                
    }

    private dbConnect() {
        this.sequelize.authenticate().then(() => {
            this.writeSysLog('Connection has been established successfully.');
            // Set associations
            this.db.Menus.model.hasMany(this.db.MenuItems.model, { foreignKey: 'menuId', sourceKey: 'menuId', as: 'items' });
            this.db.MenuItems.model.belongsTo(this.db.Menus.model, { foreignKey: 'menuId', sourceKey: 'menuId', as: 'items' });
            this.db.MenuItems.model.hasMany(this.db.Categories.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'categories' });
            this.db.Categories.model.belongsTo(this.db.MenuItems.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'categories' });
            this.db.Categories.model.hasMany(this.db.CategoryItems.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'items' });
            this.db.CategoryItems.model.belongsTo(this.db.Categories.model, { foreignKey: 'categoryId', sourceKey: 'categoryId', as: 'items' });
        
        }).catch((err: any) => {
            this.writeSysLog('Unable to connect to the database: ' + err.message);
        });
    }

    private writeSysLog = async (message: string, label: string = "[serv]", level: string = "info") => {
        try {
            await this.sysLogSrv.create(new SysLogs({
                timestamp: String(this.utils.getNow()),
                label: label,
                level: level,
                message: message
            }));
        } catch (e) {
            console.log((e as Error).message);
        }
    }
}
