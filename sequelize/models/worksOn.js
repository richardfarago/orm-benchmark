const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return WorksOn.init(sequelize, DataTypes);
}

class WorksOn extends Sequelize.Model {
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
    pno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'pnumber'
      }
    },
    hours: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Works_on',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Works_on__49DBDBBC09D63112",
        unique: true,
        fields: [
          { name: "essn" },
          { name: "pno" },
        ]
      },
    ]
  });
  return WorksOn;
  }
}
