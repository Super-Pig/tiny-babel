/**
 * 根据 ast 生成目标代码
 */
class Generator {
    constructor() {
        this.indent = 0
    }

    Program(node) {
        return node.body.map(item => `${this[item.type](item)};`).join('\n')
    }

    VariableDeclaration(node) {
        let buff = `${node.kind} `
        buff += node.declarations.map(declaration => this[declaration.type](declaration)).join(',')
        return buff
    }

    VariableDeclarator(node) {
        return `${this[node.id.type](node.id)} = ${this[node.init.type](node.init)}`
    }

    Identifier(node) {
        return node.name
    }

    Literal(node) {
        return node.raw
    }

    generate(node) {
        return this[node.type](node)
    }

    FunctionExpression(node) {
        let buff = 'function ';

        buff += this[node.id.type](node.id)
        buff += `(${node.params.map(param => this[param.type](param)).join(', ')}) `

        this.indent++
        buff += this[node.body.type](node.body)

        return buff
    }

    ArrowFunctionExpression(node) {
        let buff = '('
        buff += node.params.map(param => this[param.type](param)).join(', ')
        buff += ') => '

        this.indent++
        buff += this[node.body.type](node.body)

        return buff
    }

    BlockStatement(node) {
        let buff = '{\n'
        buff += node.body.map(item => `${''.padStart(this.indent, '\t')}${this[item.type](item)};`).join('\n')

        this.indent--

        buff += `\n${''.padStart(this.indent, '\t')}}`

        return buff
    }

    ForStatement(node) {
        let buff = `for(`
        buff += `${this[node.init.type](node.init)}; `
        buff += `${this[node.test.type](node.test)}; `
        buff += `${this[node.update.type](node.update)}`
        buff += ') '

        this.indent++
        buff += this[node.body.type](node.body)

        return buff
    }

    BinaryExpression(node) {
        let buff = this[node.left.type](node.left)
        buff += ` ${node.operator} `
        buff += this[node.right.type](node.right)
        return buff
    }

    UpdateExpression(node) {
        if (node.prefix) {
            return `${node.operator}${this[node.argument.type](node.argument)}`
        } else {
            return `${this[node.argument.type](node.argument)}${node.operator}`
        }
    }

    ExpressionStatement(node) {
        return this[node.expression.type](node.expression)
    }

    CallExpression(node) {
        let buff = this[node.callee.type](node.callee)
        buff += '('
        buff += node.arguments.map(item => this[item.type](item)).join(', ')
        buff += ')'

        return buff
    }

    MemberExpression(node) {
        return `${this[node.object.type](node.object)}.${this[node.property.type](node.property)}`
    }

    TemplateLiteral(node) {
        let buff = '`'

        buff += node.expressions.map(item => {
            let placement = '${'
            placement += this[item.type](item)
            placement += '}'
            return placement
        }).join('')

        buff += '`'
        
        return buff
    }
}

module.exports = function (node) {
    return new Generator().generate(node);
}