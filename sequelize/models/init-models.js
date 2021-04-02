var DataTypes = require("sequelize").DataTypes;
var _Department = require("./department");
var _Dependent = require("./dependent");
var _DeptLocations = require("./deptLocations");
var _Employee = require("./employee");
var _Project = require("./project");
var _WorksOn = require("./worksOn");

function initModels(sequelize) {
  var Department = _Department(sequelize, DataTypes);
  var Dependent = _Dependent(sequelize, DataTypes);
  var DeptLocations = _DeptLocations(sequelize, DataTypes);
  var Employee = _Employee(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var WorksOn = _WorksOn(sequelize, DataTypes);

  Employee.belongsToMany(Project, { as: 'pnoProjects', through: WorksOn, foreignKey: "essn", otherKey: "pno" });
  Project.belongsToMany(Employee, { as: 'essnEmployees', through: WorksOn, foreignKey: "pno", otherKey: "essn" });
  DeptLocations.belongsTo(Department, { as: "dnumberDepartment", foreignKey: "dnumber"});
  Department.hasMany(DeptLocations, { as: "deptLocations", foreignKey: "dnumber"});
  Employee.belongsTo(Department, { as: "dnoDepartment", foreignKey: "dno"});
  Department.hasMany(Employee, { as: "employees", foreignKey: "dno"});
  Project.belongsTo(Department, { as: "dnumDepartment", foreignKey: "dnum"});
  Department.hasMany(Project, { as: "projects", foreignKey: "dnum"});
  Dependent.belongsTo(Employee, { as: "essnEmployee", foreignKey: "essn"});
  Employee.hasMany(Dependent, { as: "dependents", foreignKey: "essn"});
  Employee.belongsTo(Employee, { as: "superssnEmployee", foreignKey: "superssn"});
  Employee.hasMany(Employee, { as: "employees", foreignKey: "superssn"});
  WorksOn.belongsTo(Employee, { as: "essnEmployee", foreignKey: "essn"});
  Employee.hasMany(WorksOn, { as: "worksOns", foreignKey: "essn"});
  WorksOn.belongsTo(Project, { as: "pnoProject", foreignKey: "pno"});
  Project.hasMany(WorksOn, { as: "worksOns", foreignKey: "pno"});

  return {
    Department,
    Dependent,
    DeptLocations,
    Employee,
    Project,
    WorksOn,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
