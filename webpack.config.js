var path = require('path')
const glob = require('glob')

let jslist = glob.sync('./jssrc/*.ts')
let entrylist = {}
jslist.forEach(v => {
    let name = path.basename(v, '.ts')
    entrylist[name] = v
})
module.exports = {
    entry: entrylist,
    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                },
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    mode: 'development',
    devtool: 'source-map'
}