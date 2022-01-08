import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-server';
import browsersync from 'rollup-plugin-browsersync';

export default {
    input: './src/index.js',
    output: {
        file: './build/vue.js',
        name: 'Vue',
        format: 'umd',
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            open: true,
            contentBase: ['build', 'build'],
            host: 'localhost',
            port: 8000,
        }),
        browsersync({server: 'build'})
    ]
}