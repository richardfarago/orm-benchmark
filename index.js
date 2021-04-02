const env = require('dotenv').config()
const benchmark = require('./benchmark/benchmark')

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("How many iterations? \n", rounds => {
    benchmark.start(rounds)
    rl.close()
})

//Archive
// let emps = await models.Employee.findAll({where: {fname: {[Op.or]: [{[Op.eq]: '100',},{[Op.eq]: '200',}]}}})
