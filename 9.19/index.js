const r = require("random");
const i = require("./index2");
const student = require("./elice");

const jsonData = require("./data.json");

// console.log(r.int(0, 100));
// console.log(student.name);
console.log(jsonData.name);

const [_n, _f, a, b, c] = process.argv;

console.log(process.argv);
console.log(_n, _f, a, b, c);