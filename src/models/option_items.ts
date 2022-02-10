import { DataTypes } from "sequelize";
module.exports = function (sequelize: any) {
  return sequelize.define('option_items', {
    optionItemId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    optionItemName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    optionId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'option_items',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "optionItemId" },
        ]
      },
      {
        name: "FK_OPTIONS",
        using: "BTREE",
        fields: [
          { name: "optionId" },
        ]
      },
    ]
  });
};
