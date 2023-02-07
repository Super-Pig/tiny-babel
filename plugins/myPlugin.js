/**
 * myBabel 插件
 * 转换 es6 语法
 * const、let -> var
 * 箭头函数 -> function
 * @param {*} api 
 * @param {*} options 
 * @returns 
 */
const VariableDeclaration = {
    enter: node => {
        node.kind = 'var'
    }
}

const ArrowFunctionExpression = {
    enter: (node, parent) => {
        node.id = parent.id
        node.type = 'FunctionExpression'
    }
}

const TemplateLiteral = {
    enter: (node, parent) => {
        node.type = 'CallExpression'

        let i = node.expressions.length - 1

        const buildCallee = (i) => {
            if (i === -1) {
                return {
                    type: 'MemberExpression',
                    object: {
                        type: 'Literal',
                        value: '',
                        raw: "\"\""
                    },
                    property: {
                        type: 'Identifier',
                        name: 'concat'
                    }
                }
            }

            return {
                type: 'MemberExpression',
                object: {
                    type: 'CallExpression',
                    callee: buildCallee(i - 1),
                    arguments: [node.expressions[i]]
                },
                property: {
                    type: 'Identifier',
                    name: 'concat'
                }
            }
        }

        node.callee = buildCallee(node.expressions.length - 2)
        node.arguments = [node.expressions[node.expressions.length - 1]]

        delete node.expressions
    }
}

module.exports = (api, options) => ({
    visitor: {
        VariableDeclaration,
        ArrowFunctionExpression,
        TemplateLiteral
    }
})