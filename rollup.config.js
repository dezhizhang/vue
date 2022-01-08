import babel from 'rollup-plugin-babel';
export default {
    input:'./src/index.js',
    output:{
        file:'./build/vue.js',
        name:'Vue',
        format:'umd',
        sourcemap:true,
    },
    plugins:[
        babel({
            exclude:'node_modules/**'
        }),
    ]
}