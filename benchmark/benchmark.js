const sequelize = require('../sequelize/queries')
const mssql = require('../mssql/queries')
const knex = require('../knex/queries')
const perf = require('./perf')
const helpers = require('./helpers')

async function start(rounds) {

    console.log(`Starting Sequelize with ${rounds} iterations`)
    let sequelizeResults = await startSequelize(helpers.initResults(rounds), rounds)
    helpers.printResults(sequelizeResults, rounds)

    console.log(`Starting mssql client with ${rounds} iterations`)
    let mssqlResults = await startSql(helpers.initResults(rounds), rounds)
    helpers.printResults(mssqlResults, rounds)

    console.log(`Starting knex with ${rounds} iterations`)
    let knexResults = await startKnex(helpers.initResults(rounds), rounds)
    helpers.printResults(knexResults, rounds)
}

async function startSequelize(results, rounds) {

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

async function startSql(results, rounds) {

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

async function startKnex(results, rounds) {

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
