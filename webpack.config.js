const path = require('path');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src/client'),
    entry: {
        app: './index.tsx',  // Actualiza la entrada al archivo .tsx
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist/static'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],  // Permite resolver archivos .ts y .tsx,
        modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Asegura que Webpack busque en 'node_modules'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // Asegúrate de que babel-loader maneje ts y tsx
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
    devtool: 'inline-source-map',
};
