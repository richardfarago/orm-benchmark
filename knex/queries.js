let knex = null

async function playground() {
    let res = await knex('Employee').where('fname', 'like', '%Maria%').orWhere('fname', 'like', '%Updated%').del()
    console.log(res)
}

async function insert(i, rounds) {
    return knex('Employee').insert({
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
    return knex('Employee').where('ssn', i)
}

async function findAll(i, rounds) {
    return knex('Employee')
}

async function update(i, rounds) {
    return knex('Employee').where('ssn', '=', i).update({ fname: 'Updated' + i })
}

async function remove(i, rounds) {
    return knex('Employee').where('ssn', '=', i).del()
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

async function cleanup() {
    return knex('Employee').where('fname', 'like', '%Maria%').orWhere('fname', 'like', '%Updated%').del()
}

module.exports = { connect, disconnect, insert, findOne, findAll, update, remove, cleanup, playground }