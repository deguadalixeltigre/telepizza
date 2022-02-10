import { DataTypes } from "sequelize";

export class Categories {
    public model: any;
    constructor(sequelize: any) {
        this.model = sequelize.define('categories', {
            categoryId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'menu_items',
                    key: 'categoryId'
                }
            },
            categoryName: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(256),
                allowNull: false
            }
        }, {
            tableName: 'categories',
            timestamps: false
        });    
    }
}
/*
module.exports = function (sequelize: any) {
    const Categories = sequelize.define('categories', {
        categoryId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'menu_items',
                key: 'categoryId'
            }
        },
        categoryName: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(256),
            allowNull: false
        }
    }, {
        tableName: 'categories',
        timestamps: false
    });    
    return Categories;
};
*/