const color = require('colors');
console.log(process.argv);
let c = [color.green, color.yellow, color.red]

let [n] = process.argv.slice(3);
let [k] = process.argv.slice(2);

if (n <= 2) {
    console.log(color.red("Простых чисел в диапазоне нет!"));
    return false;
} else if ((isNaN(n)) || (isNaN(k))) {
    console.log(color.red("not number!"));
    return false;
} else
    for (k; k <= n; k++) {

        for (let j = 2; j < k; j++) {
            if ((k % j == 0) && (j !== k)) {
                break;
            } else {
                c.forEach(item => {
                    console.log(item(k));
                })
                break;
            }
        }
    }