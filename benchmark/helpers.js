function initResults(rounds) {
    let results = []
    for (let i = 0; i < rounds; i++) {
        results.push({ all: 0 })
    }
    return results
}

function printResults(results, rounds) {

    delete results[0];

    let obj = {}
    let min = {};
    let max = {};
    let avg = {};
    let stdev = {};

    for (prop of Object.keys(results[1])) {

        obj[prop] = []
        min[prop] = Number.MAX_VALUE
        max[prop] = 0
        avg[prop] = 0
        stdev[prop] = 0

        results.forEach(row => {
            //MIN
            min[prop] = Math.min(min[prop], row[prop]);
            //MAX
            max[prop] = Math.max(max[prop], row[prop]);
            //AVG
            avg[prop] += row[prop];
            //STDEV
            obj[prop].push(row[prop])
        });

        avg[prop] /= rounds - 1;
        stdev[prop] = getStandardDeviation(obj[prop])
    }
    console.table({ min, avg, max, stdev });
}

//With population (?)
function getStandardDeviation(array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    const stdev = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    return stdev
}

module.exports = { initResults, printResults }