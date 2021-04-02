const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Department.init(sequelize, DataTypes);
}

class Department extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    dname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "UQ__Departme__6B0C41ADECAA621D"
    },
    dnumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mgrssn: {
      type: DataTypes.CHAR(9),
      allowNull: false
    },
    mgrstartdate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Department',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Departme__37CC54823E056EA0",
        unique: true,
        fields: [
          { name: "dnumber" },
        ]
      },
      {
        name: "UQ__Departme__6B0C41ADECAA621D",
        unique: true,
        fields: [
          { name: "dname" },
        ]
      },
    ]
  });
  return Department;
  }
}
