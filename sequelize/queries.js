const { performance } = require('perf_hooks');
const { Op } = require('sequelize');
const { sequelize } = require('./models')
var initModels = require("./models/init-models");
var models = initModels(sequelize);

async function insert(i, rounds) {
    return models.Employee.create({
        fname: 'Maria ' + i,
        minit: 'T',
        lname: 'Testova',
        ssn: i,
        address: '777 Testvej, Testonia,TS',
        sex: 'M',
        salary: 30000,
        superssn: '333445555',
        dno: 5
    })
}

async function findOne(i, rounds) {
    return models.Employee.findAll({ where: { ssn: i } })
}

async function findAll(i, rounds) {
    return models.Employee.findAll()
}

async function update(i, rounds) {
    return models.Employee.update({ fname: 'Updated' + i }, { where: { ssn: i } })
    //await models.Employee.update({ fname: 'Updated' }, { where: { ssn: { [Op.between]: [0, 100] } } })
}

async function remove(i, rounds) {
    return models.Employee.destroy({ where: { ssn: i } })
    //await models.Employee.destroy({ where: { ssn: { [Op.between]: [0, rounds] } } })
}

function connect() {
    return sequelize.authenticate()
}

function disconnect() {
    return sequelize.close()
}

async function cleanup() {
    return models.Employee.destroy({
        where: {
            fname: {
                [Op.or]: [
                    {
                        [Op.like]: '%Maria%'
                    },
                    {
                        [Op.like]: '%Updated%',
                    }
                ]
            }
        }
    })
}

module.exports = { connect, disconnect, insert, findOne, findAll, update, remove, cleanup }