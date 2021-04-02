const { performance } = require('perf_hooks');

//PRE: Assume that f is a promise
async function bench(f, rounds, title, results) {
    let promises = []
    for (let i = 0; i < rounds; i++) {
        promises.push(() => f(i, rounds))
    }

    for await ([j, promise] of promises.entries()) {

        //console.log('starting round: ' + j)
        let start = performance.now()
        await promise()
        let took = performance.now() - start

        results[j].all += took;
        results[j][title] = took;
    }

    return results
}

module.exports = { bench }