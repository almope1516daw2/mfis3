import express from "express";
import graphQLHTTP from "express-graphql";
import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import Schema from "./data/schema.es6";
import mongoose from "mongoose";

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

let graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema: Schema, pretty: true}));
try {
    graphQLServer.listen(GRAPHQL_PORT, () => {
        console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`);
        mongoose.connect('mongodb://192.168.99.100:32768/test');
    });
} catch (err) {
    console.log("Not connected to MongoDB")
}

let compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
            },
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.(jpg|jpeg|png|svg)$/, loader: 'url-loader'},
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    output: {filename: 'app.js', path: '/'},
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
});

let app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: '/js/',
    stats: {colors: true}
});

app.use('/', express.static('public'));
app.use('/node_modules/react', express.static('node_modules/react'));
app.use('/node_modules/react-relay', express.static('node_modules/react-relay'));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
