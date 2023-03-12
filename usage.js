const { readFileSync } = require('filesystem')
const { resolve } = require('pathname')
const pipe = require('pipe')
const merge = require('./index')

const spec = resolve(process.cwd(), 'sample.txt')
const input = readFileSync(spec, 'auto')

pipe()
    .use(merge, 4)
    .process(input, (err, res) => {
        if (err) console.error(err)
        console.log(res)
    })