const worker_threads = require('worker_threads');
const TEST_FILE = './access.log';

let IPs = process.argv.slice(2);

if (IPs.length == 0) {
    IPs = ['89.123.1.41', '34.48.240.111'];
}

(async() => {
    const worker = new worker_threads.Worker('./search.js', {
        workerData: {
            path: TEST_FILE,
            IPs: IPs
        }
    });
})()