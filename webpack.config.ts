import type { Configuration } from 'webpack';

const config: Configuration = {
    entry: './src/index.ts',
    mode: 'production',
    target: 'async-node',
    output: {
        filename: 'build/[name].js',
        sourceMapFilename: 'build/[name].map'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /.tsx?/,
                loader: 'ts-loader'
            }
        ]
    }
}

export default config;