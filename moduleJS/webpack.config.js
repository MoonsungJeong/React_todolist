const path = require('path');
module.exports = {
    entry:"./source/init.js",
    output:{
        path:path.resolve(__dirname,"public"),
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}