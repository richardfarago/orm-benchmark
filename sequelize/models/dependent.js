const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Dependent.init(sequelize, DataTypes);
}

class Dependent extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    essn: {
      type: DataTypes.CHAR(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Employee',
        key: 'ssn'
      }
    },
    dependentName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      field: 'dependent_name'
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    bdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    relationship: {
      type: DataTypes.STRING(8),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Dependent',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Dependen__3092CD280C3AF3F0",
        unique: true,
        fields: [
          { name: "essn" },
          { name: "dependent_name" },
        ]
      },
    ]
  });
  return Dependent;
  }
}
