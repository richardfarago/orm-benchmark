const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Employee.init(sequelize, DataTypes);
}

class Employee extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    fname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    minit: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    lname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    ssn: {
      type: DataTypes.CHAR(9),
      allowNull: false,
      primaryKey: true
    },
    bdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    superssn: {
      type: DataTypes.CHAR(9),
      allowNull: true,
      references: {
        model: 'Employee',
        key: 'ssn'
      }
    },
    dno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Department',
        key: 'dnumber'
      }
    }
  }, {
    sequelize,
    tableName: 'Employee',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Employee__DDDF0AE7145512FE",
        unique: true,
        fields: [
          { name: "ssn" },
        ]
      },
    ]
  });
  return Employee;
  }
}
