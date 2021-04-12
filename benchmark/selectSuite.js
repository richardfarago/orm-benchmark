const sequelize = require('../sequelize/select')
const mssql = require('../mssql/select')
const knex = require('../knex/select')
const perf = require('./perf')
const helpers = require('./helpers')

async function start(rounds) {
    console.log(`SELECT suite started at ${new Date().toUTCString()}\n`)

    console.log(`Starting Sequelize with ${rounds} iterations`)
    let sequelizeResults = await sequelizeSelect(helpers.initResults(rounds), rounds)
    helpers.printResults(sequelizeResults, rounds)

    console.log(`Starting mssql client with ${rounds} iterations`)
    let mssqlResults = await sqlSelect(helpers.initResults(rounds), rounds)
    helpers.printResults(mssqlResults, rounds)

    console.log(`Starting knex with ${rounds} iterations`)
    let knexResults = await knexSelect(helpers.initResults(rounds), rounds)
    helpers.printResults(knexResults, rounds)

    console.log(`Finished at ${new Date().toUTCString()}`)
}

async function sequelizeSelect(results, rounds) {

    //PRE
    await sequelize.connect()

    results = await perf.bench(sequelize.single, rounds, 'single table', results)
    results = await perf.bench(sequelize.singleWithProject, rounds, 'single table (with projection)', results)
    results = await perf.bench(sequelize.top500, rounds, 'single table top 500', results)
    results = await perf.bench(sequelize.orderBy, rounds, 'order by', results)
    results = await perf.bench(sequelize.groupBy, rounds, 'group by + count', results)
    results = await perf.bench(sequelize.findNested, rounds, 'nested', results)

    //POST
    await sequelize.disconnect()

    return results
}

async function sqlSelect(results, rounds) {

    //PRE
    await mssql.connect()

    results = await perf.bench(mssql.single, rounds, 'single table', results)
    results = await perf.bench(mssql.singleWithProject, rounds, 'single table (with projection)', results)
    results = await perf.bench(mssql.top500, rounds, 'single table top 500', results)
    results = await perf.bench(mssql.orderBy, rounds, 'order by', results)
    results = await perf.bench(mssql.groupBy, rounds, 'group by + count', results)
    results = await perf.bench(mssql.findNestedRaw, rounds, 'nested (raw)', results)
    //results = await perf.bench(mssql.findNestedJson, rounds, 'nestedJson', results)
    //results = await perf.bench(mssql.findNestedJsonAuto, rounds, 'nestedJsonAuto', results)

    //POST
    await mssql.disconnect()

    return results
}

async function knexSelect(results, rounds) {

    //PRE
    await knex.connect()

    results = await perf.bench(knex.single, rounds, 'single table', results)
    results = await perf.bench(knex.singleWithProject, rounds, 'single table (with projection)', results)
    results = await perf.bench(knex.top500, rounds, 'single table top 500', results)
    results = await perf.bench(knex.orderBy, rounds, 'order by', results)
    results = await perf.bench(knex.groupBy, rounds, 'group by + count', results)
    results = await perf.bench(knex.findNested, rounds, 'nested', results)

    //POST
    await knex.disconnect()

    return results
}

module.exports = { start }
