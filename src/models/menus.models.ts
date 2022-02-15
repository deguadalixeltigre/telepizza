import { DataTypes } from "sequelize";

export class Menus {
    public model: any;
    constructor(sequelize: any) {
        this.model = sequelize.define('menus', {
            menuId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                key: 'menuId'
            },
            menuName: {
                type: DataTypes.STRING(60),
                allowNull: false
            }
        }, {
            tableName: 'menus',
            timestamps: false
        }); 
    }
}
/*
module.exports = function (sequelize: any) {
    const Menus = sequelize.define('menus', {
        menuId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                key: 'menuId'
        },
        menuName: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }, {
        tableName: 'menus',
        timestamps: false
    }); 
    return Menus;
};
*/
