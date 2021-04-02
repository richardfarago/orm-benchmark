const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Project.init(sequelize, DataTypes);
}

class Project extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    pname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "UQ__Project__1FC9734C72A5C4BB"
    },
    pnumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plocation: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    dnum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Department',
        key: 'dnumber'
      }
    }
  }, {
    sequelize,
    tableName: 'Project',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Project__0E0FD1FBDC9B9AB7",
        unique: true,
        fields: [
          { name: "pnumber" },
        ]
      },
      {
        name: "UQ__Project__1FC9734C72A5C4BB",
        unique: true,
        fields: [
          { name: "pname" },
        ]
      },
    ]
  });
  return Project;
  }
}
