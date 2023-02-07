const Parser = require('./parser')
const traverse = require('./traverser')
const generate = require('./generator')

const transformSync = (code, options) => {
    const ast = Parser.parse(code, { ecmaVersion: 2020 })
    const visitors = {}

    options.plugins.forEach(([plugin, opts]) => {
        const res = plugin(null, opts)
        Object.assign(visitors, res.visitor)
    })

    traverse(ast, visitors)

    return generate(ast)
}

module.exports = {
    transformSync
}