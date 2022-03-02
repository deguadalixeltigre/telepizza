import { DataTypes } from "sequelize";

export class Devices {
    public model: any;
    constructor(sequelize: any) {
        this.model = sequelize.define('devices', {
            deviceId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                key: 'deviceId'
            },
            deviceName: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(60),
                allowNull: false
            }
        }, {
            tableName: 'devices',
            timestamps: false
        });
    }
}