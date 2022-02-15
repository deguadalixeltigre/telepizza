import { DataTypes } from "sequelize";

export class MenuItems {
    public model: any;
    constructor(sequelize: any) {
        this.model = sequelize.define('menu_items', {
            menuItemId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                key: 'menuItemId'
            },
            menuId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                references: {
                    model: 'menus',
                    key: 'menuId'
                }
            },
            categoryId: {
                type: DataTypes.STRING(36),
                allowNull: false
            }
        }, {
            tableName: 'menu_items',
            timestamps: false
        });    
    }
}
/*
module.exports = function (sequelize: any) {
    const MenuItems = sequelize.define('menu_items', {
        menuItemId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            key: 'menuItemId'
        },
        menuId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: 'menus',
                key: 'menuId'
            }
        },
        categoryId: {
            type: DataTypes.STRING(36),
            allowNull: false
        }
    }, {   
       tableName: 'menu_items',
       timestamps: false
    });    
    return MenuItems;
};
*/