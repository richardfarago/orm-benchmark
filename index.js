const env = require('dotenv').config()
const crud = require('./benchmark/crudSuite')
const select = require('./benchmark/selectSuite')
const _ = require('lodash')

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('[1] CRUD SUITE')
console.log('[2] SELECT SUITE')
rl.question('Choose a benchmark suite\n>', number => {
    rl.question("How many iterations? \n>", rounds => {
        if (number == 1) {
            crud.start(rounds)
        } else if (number == 2) {
            select.start(rounds)
        } else {
            console.log('Wrong input')
        }
        rl.close()
    })
})

//Archive
// let emps = await models.Employee.findAll({where: {fname: {[Op.or]: [{[Op.eq]: '100',},{[Op.eq]: '200',}]}}})

