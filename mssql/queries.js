const sql = require('mssql')

const config = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB,
    options: {
        enableArithAbort: false
    }
}

async function insert(i, rounds) {
    return sql.query(`INSERT INTO Employee (fname, minit, lname, ssn,address,sex,salary,superssn,dno) VALUES ('Maria ${i}', 'T', 'Testova', '${i}', '777 Testvej, Testonia,TS', 'M', 30000, '333445555', 5)`)
}

async function findOne(i, rounds) {
    return sql.query(`SELECT * FROM Employee WHERE ssn = '${i}'`)
}

async function findAll(i, rounds) {
    return sql.query('SELECT * FROM Employee')
}

async function update(i, rounds) {
    return sql.query(`UPDATE Employee SET fname='Updated${i}' WHERE ssn = ${i}`)
}

async function remove(i, rounds) {
    return sql.query(`DELETE FROM Employee WHERE ssn = ${i}`)
}

async function connect() {
    return sql.connect(config)
}

async function disconnect() {
    return sql.close()
}

async function cleanup() {
    return sql.query(`DELETE FROM Employee WHERE fname LIKE '%Maria%' OR fname LIKE '%Updated%'`)
}

sql.on('error', err => {
    console.log(err)
})

module.exports = { connect, disconnect, insert, findOne, findAll, update, remove, cleanup }