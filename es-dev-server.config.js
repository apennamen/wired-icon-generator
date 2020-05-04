const cjsTransformer = require('es-dev-commonjs-transformer');

module.exports = {
port: 8001,
watch: true,
nodeResolve: true,
appIndex: 'index.html',
moduleDirs: ['node_modules'],
responseTransformers: [
    cjsTransformer(/* Exclude Paths Array */ [
            '**/node_modules/@open-wc/**/*',
        ])
    ],
}