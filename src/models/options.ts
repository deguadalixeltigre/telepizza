import { DataTypes } from "sequelize";
module.exports = function (sequelize: any) {
  return sequelize.define('options', {
    optionId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    optionName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'options',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_KEY",
        using: "BTREE",
        fields: [
          { name: "optionId" },
        ]
      },
    ]
  });
};
