/**
 * myBabel 配置文件
 */
const myPlugin = require('./plugins/myPlugin')

module.exports = {
    plugins: [
        [
            myPlugin, {}
        ]
    ]
}