import { DataTypes } from "sequelize";

export class CategoryItems {
    public model: any;
    constructor(sequelize: any) {
        this.model = sequelize.define('category_items', {
            categoryItemId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true
            },
            categoryItemName: {
                type: DataTypes.STRING(36),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            categoryId: {
                type: DataTypes.STRING(36),
                allowNull: false
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0
            }
        }, {
            tableName: 'category_items',
            timestamps: false,
        });
    }
}
/*
module.exports = function (sequelize: any) {
    const CategoryItems = sequelize.define('category_items', {
        categoryItemId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        categoryItemName: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        categoryId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'category_items',
        timestamps: false,
    });
    return CategoryItems;
};
*/