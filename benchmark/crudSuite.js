const sequelize = require('../sequelize/crud')
const mssql = require('../mssql/crud')
const knex = require('../knex/crud')
const perf = require('./perf')
const helpers = require('./helpers')

async function start(rounds) {

    console.log(`CRUD suite started at ${new Date().toUTCString()}\n`)

    console.log(`Starting Sequelize with ${rounds} iterations`)
    let sequelizeResults = await _sequelize(helpers.initResults(rounds), rounds)
    helpers.printResults(sequelizeResults, rounds)

    console.log(`Starting mssql client with ${rounds} iterations`)
    let mssqlResults = await _sql(helpers.initResults(rounds), rounds)
    helpers.printResults(mssqlResults, rounds)

    console.log(`Starting knex with ${rounds} iterations`)
    let knexResults = await _knex(helpers.initResults(rounds), rounds)
    helpers.printResults(knexResults, rounds)

    console.log(`Finished at ${new Date().toUTCString()}`)
}

async function _sequelize(results, rounds) {

    //PRE
    await sequelize.connect()
    await sequelize.cleanup()

    results = await perf.bench(sequelize.insert, rounds, 'insert', results)
    results = await perf.bench(sequelize.findOne, rounds, 'findOne', results)
    results = await perf.bench(sequelize.findAll, rounds, 'findAll', results)
    results = await perf.bench(sequelize.update, rounds, 'update', results)
    results = await perf.bench(sequelize.remove, rounds, 'remove', results)

    //POST
    await sequelize.disconnect()

    return results
}

async function _sql(results, rounds) {

    //PRE
    await mssql.connect()
    await mssql.cleanup()

    results = await perf.bench(mssql.insert, rounds, 'insert', results)
    results = await perf.bench(mssql.findOne, rounds, 'findOne', results)
    results = await perf.bench(mssql.findAll, rounds, 'findAll', results)
    results = await perf.bench(mssql.update, rounds, 'update', results)
    results = await perf.bench(mssql.remove, rounds, 'remove', results)

    //POST
    await mssql.disconnect()

    return results

}

async function _knex(results, rounds) {

    //PRE
    await knex.connect()
    await knex.cleanup()

    results = await perf.bench(knex.insert, rounds, 'insert', results)
    results = await perf.bench(knex.findOne, rounds, 'findOne', results)
    results = await perf.bench(knex.findAll, rounds, 'findAll', results)
    results = await perf.bench(knex.update, rounds, 'update', results)
    results = await perf.bench(knex.remove, rounds, 'remove', results)

    //POST
    await knex.disconnect()

    return results
}


module.exports = { start }
