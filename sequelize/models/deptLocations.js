const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DeptLocations.init(sequelize, DataTypes);
}

class DeptLocations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    dnumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Department',
        key: 'dnumber'
      }
    },
    dlocation: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Dept_Locations',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Dept_Loc__6A047B24EF8CC370",
        unique: true,
        fields: [
          { name: "dnumber" },
          { name: "dlocation" },
        ]
      },
    ]
  });
  return DeptLocations;
  }
}
