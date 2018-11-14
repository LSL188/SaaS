// 'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: process.env.NODE_ENV
// })

module.exports = {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    // BASE_API: '"http://backend-int.moneyworks.cn:30080/"'
    BASE_API: '"/proxyapi/"'
}
