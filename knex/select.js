const _ = require('lodash')
let knex = null

async function single(i, rounds) {
    return knex('Employee')
}

async function singleWithProject(i, rounds) {
    return knex('Employee').select('fname', 'minit', 'lname')
}

async function top500(i, rounds) {
    return knex('Employee').limit('500')
}

async function orderBy(i, rounds) {
    return knex('Employee').orderBy('lname')
}

async function groupBy(i, rounds) {
    return knex('Employee').select('dno').count('ssn as #').groupBy('dno')
}

async function findNested(i, rounds) {
    return new Promise(async (resolve, reject) => {
        let emps = await knex('Works_on').join('Employee', 'Employee.ssn', 'Works_on.essn').join('Project', 'Project.pnumber', 'Works_on.pno')
        emps = _(emps).groupBy(x => (x.ssn)).map((value, key) => {
            let fields = { ...value[0] }
            delete fields.plocation
            delete fields.pnumber
            delete fields.pname
            delete fields.dnum
            delete fields.hours
            return { ssn: key, projects: value, ...fields }
        }).value();
        resolve(emps)
    })
}

async function connect() {
    return new Promise((resolve, reject) => {
        knex = require('knex')({
            client: 'mssql',
            connection: {
                host: 'localhost',
                user: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DB
            }
        });

        knex.raw('select 1+1 as result').then(() => {
            resolve()
        }).catch(err => {
            reject()
            console.log(err);
            process.exit(1);
        });
    })
}

async function disconnect() {
    return knex.destroy()
}

module.exports = { connect, disconnect, single, singleWithProject, top500, orderBy, groupBy, findNested, playground }

async function playground() {
    let emps
    try {
        emps = await knex('Employee').select('dno').count('ssn as #').groupBy('dno')
    } catch (e) {
        console.log(e)
    }
    console.log(emps)
}