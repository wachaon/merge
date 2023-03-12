const { isString, isArray } = require('typecheck')
const { STRING, NONE, LF, rLINE_SEP } = require('text')
const { get } = require('argv')
const isCLI = require('isCLI')
const { resolve, extname } = require('pathname')
const { readFileSync, writeFileSync } = require('filesystem')
const genGUID = require('genGUID')

if (isCLI(__filename)) {
    const div = get('div') || console.error('Unspecified params [div]')
    const input = get('input') || console.error('Unspecified params [input]')
    const ext = extname(input)
    const output = get('output') === true ? NONE : resolve(process.cwd(), get('output') || genGUID() + ext)
    const data = ext === NONE ? require(input) : readFileSync(resolve(process.cwd(), input), 'auto')
    const result = merge(data, div)

    if (output === NONE) console.log(result)
    else console.log(() => writeFileSync(output, result, 'UTF-8'))
} else module.exports = merge

function merge(lines, divisor) {
    let type = NONE
    if (isString(lines)) {
        type = STRING
        lines = lines.split(rLINE_SEP)
    }
    if (isArray(lines)) {
        const res = []
        let line = []
        for (let i = 0; i < lines.length; i++) {
            const mod = i % divisor
            line.push(lines[i])
            if (mod === divisor - 1) {
                res.push(line.join(NONE))
                line = []
            }
        }
        if (line.length) res.push(line.join(NONE))
        return type === STRING ? res.join(LF) : res
    } else return lines
}
