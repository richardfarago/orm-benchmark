const { performance } = require('perf_hooks');
const { Op } = require('sequelize');
const { sequelize } = require('./models')
var initModels = require("./models/init-models");
var models = initModels(sequelize);

async function single(i, rounds) {
    return models.Employee.findAll()
}

async function singleWithProject(i, rounds) {
    return models.Employee.findAll({ attributes: ['fname', 'minit', 'lname'] })
}

async function top500(i, rounds) {
    return models.Employee.findAll({ limit: 500 })
}

async function orderBy(i, rounds) {
    return models.Employee.findAll({ order: ['lname'] })
}

async function groupBy(i, rounds) {
    return models.Employee.findAll({ group: ['dno'], attributes: ['dno', [sequelize.fn('COUNT', 'ssn'), '#']] });
}

async function findNested(i, rounds) {
    return models.Employee.findAll({ include: { model: models.Project, as: 'pnoProjects' } })
}

function connect() {
    return sequelize.authenticate()
}

function disconnect() {
    return sequelize.close()
}

module.exports = { connect, disconnect, single, singleWithProject, top500, orderBy, groupBy, findNested, playground }

async function playground() {
    let emps = await models.Employee.findAll({ group: ['dno'], attributes: ['dno', [sequelize.fn('COUNT', 'ssn'), '#']] })
    console.log(emps)
}