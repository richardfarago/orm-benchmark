
function initResults(rounds) {
    let results = []
    for (let i = 0; i < rounds; i++) {
        //{ all: number; find: number; insert: number; update: number; remove: number }
        results.push({ all: 0 })
    }
    return results
}

function printResults(results, rounds) {

    let all = []
    let insert = []
    let findOne = []
    let findAll = []
    let update = []
    let remove = []

    process.stdout.write(`\r`);
    //console.table(results);

    delete results[0]; // ignore first round (warm up)

    //const min = { all: Number.MAX_VALUE, find: Number.MAX_VALUE, insert: Number.MAX_VALUE, update: Number.MAX_VALUE, remove: Number.MAX_VALUE };
    const min = { all: Number.MAX_VALUE, findOne: Number.MAX_VALUE, findAll: Number.MAX_VALUE, insert: Number.MAX_VALUE, update: Number.MAX_VALUE, remove: Number.MAX_VALUE };
    //const max = { all: 0, find: 0, insert: 0, update: 0, remove: 0 };
    const max = { all: 0, findOne: 0, findAll: 0, insert: 0, update: 0, remove: 0 };
    //const avg = { all: 0, find: 0, insert: 0, update: 0, remove: 0 };
    const avg = { all: 0, findOne: 0, findAll: 0, insert: 0, update: 0, remove: 0 };

    const stdev = { all: 0, findOne: 0, findAll: 0, insert: 0, update: 0, remove: 0 };

    results.forEach(row => {
        min.all = Math.min(min.all, row.all);
        min.insert = Math.min(min.insert, row.insert);
        //min.find = Math.min(min.find, row.find);
        min.findOne = Math.min(min.findOne, row.findOne);
        min.findAll = Math.min(min.findAll, row.findAll);
        min.update = Math.min(min.update, row.update);
        min.remove = Math.min(min.remove, row.remove);

        max.all = Math.max(max.all, row.all);
        max.insert = Math.max(max.insert, row.insert);
        //max.find = Math.max(max.find, row.find);
        max.findOne = Math.max(max.findOne, row.findOne);
        max.findAll = Math.max(max.findAll, row.findAll);
        max.update = Math.max(max.update, row.update);
        max.remove = Math.max(max.remove, row.remove);

        avg.all += row.all;
        avg.insert += row.insert;
        //avg.find += row.find;
        avg.findOne += row.findOne;
        avg.findAll += row.findAll;
        avg.update += row.update;
        avg.remove += row.remove;

        all.push(row.all)
        insert.push(row.insert)
        findOne.push(row.findOne)
        findAll.push(row.findAll)
        update.push(row.update)
        remove.push(row.remove)
    });

    avg.all /= rounds;
    avg.insert /= rounds;
    //avg.find /= rounds;
    avg.findOne /= rounds;
    avg.findAll /= rounds;
    avg.update /= rounds;
    avg.remove /= rounds;

    stdev.all = getStandardDeviation(all)
    stdev.insert = getStandardDeviation(insert)
    stdev.findOne = getStandardDeviation(findOne)
    stdev.findAll = getStandardDeviation(findAll)
    stdev.update = getStandardDeviation(update)
    stdev.remove = getStandardDeviation(remove)

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