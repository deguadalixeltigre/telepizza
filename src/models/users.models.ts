import { DataTypes } from "sequelize";

export class Users {
    public model: any;
    constructor(sequelize: any) {
        this.model = sequelize.define('users', {
            userId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                key: 'userId'
            },
            userName: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(60),
                allowNull: false
            }
        }, {
            tableName: 'users',
            timestamps: false
        });
    }
}