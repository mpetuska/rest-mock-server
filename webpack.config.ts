import type { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config: Configuration = {
    entry: './src/index.ts',
    mode: 'production',
    target: 'async-node',
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /.tsx?/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                }
            }
        ]
    },
    plugins: [new ForkTsCheckerWebpackPlugin()]
}

export default config;
