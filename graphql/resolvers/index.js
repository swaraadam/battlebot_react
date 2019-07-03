const authResolver = require('./auth')
const tankResolver = require('./tanks')
const matchResolver = require('./matchs')

const rootResolver = {
    ...authResolver,
    ...tankResolver,
    ...matchResolver
}

module.exports = rootResolver