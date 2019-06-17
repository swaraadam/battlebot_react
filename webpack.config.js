var path = require ('path')
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(pathToPhaser, 'dist/phaser.js')

module.exports = {

    devServer:{
        contentBase: path.resolve(__dirname, './'),
        publi
    },

    resolve:{
        extensions:['js'],
        alias:{
            phaser: phaser
        }
    }
}