const sql = require('mssql')
const _ = require('lodash')
var fs = require('fs');

const config = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB,
    options: {
        enableArithAbort: false
    }
}

async function single(i, rounds) {
    return sql.query(`SELECT * FROM Employee`);
}

async function singleWithProject(i, rounds) {
    return sql.query(`SELECT fname,minit,lname FROM Employee`);
}

async function top500(i, rounds) {
    return sql.query(`SELECT TOP(500) * FROM Employee`);
}

async function orderBy(i, rounds) {
    return sql.query(`SELECT * FROM Employee ORDER BY lname`);
}

async function groupBy(i, rounds) {
    return sql.query(`SELECT dno, COUNT(ssn) as # FROM Employee GROUP BY dno`);
}

async function findNestedRaw(i, rounds) {
    return new Promise(async (resolve, reject) => {
        let emps = await sql.query(`SELECT E.*,P.*,W.hours FROM Works_on W INNER JOIN Employee E on E.ssn = W.essn INNER JOIN Project P on P.pnumber = W.pno`);
        emps.recordset = _(emps.recordset).groupBy(x => (x.ssn)).map((value, key) => {
            let fields = { ...value[0] }
            delete fields.plocation
            delete fields.pnumber
            delete fields.pname
            delete fields.dnum
            delete fields.hours
            return { ssn: key, projects: value, ...fields }
        }).value();
        resolve(emps.recordset)
    })
}

async function findNestedJson(i, rounds) {
    return new Promise(async (resolve, reject) => {
        let emps = await sql.query(`SELECT * FROM "Employee" e OUTER APPLY(SELECT * FROM Works_on w INNER JOIN Project P on w.pno = P.pnumber WHERE w.essn = e.ssn FOR JSON PATH) sp("projects")`)
        for (emp of emps.recordset) {
            emp.projects = JSON.parse(emp.projects)
        }
        resolve(emps.recordset)
    })
}

async function findNestedJsonAuto(i, rounds) {
    return new Promise(async (resolve, reject) => {
        let emps = await sql.query(`SELECT E.*,projects.*,w.hours FROM Works_on w INNER JOIN Employee E on E.ssn = w.essn INNER JOIN Project projects on projects.pnumber = w.pno FOR JSON AUTO`);
        emps.recordset = emps.recordset[0]
        let prop = Object.keys(emps.recordset)[0]
        emps.recordset = emps.recordset[prop]
        emps.recordset = JSON.parse(emps.recordset)
        resolve(emps.recordset)
    })
}

async function connect() {
    return sql.connect(config)
}

async function disconnect() {
    return sql.close()
}

sql.on('error', err => {
    console.log(err)
})

module.exports = { connect, disconnect, single, singleWithProject, top500, orderBy, groupBy, findNestedRaw, findNestedJson, findNestedJsonAuto }