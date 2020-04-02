const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: 'themes/custom/vrupal/assets',
    outputDir: 'web/themes/custom/vrupal/assets',
    css: {
        extract: {
            filename: 'css/app.css',
        },
    },
    chainWebpack: config => {
        config.output
            .filename('js/[name].js')
            .chunkFilename('js/[name].js');
        // Exclude html from building process since we don't need index.html
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        // Disable hot reload
        config.plugins.delete('hmr');
    },
    configureWebpack: {
        performance: {
            hints: process.env.NODE_ENV === 'development' ? false : 'warning',
        },
        entry: { // Define new entries if you need separate bundles
            app: './web/themes/custom/vrupal/src/main.js',
        },
        plugins: [
            new CompressionPlugin({
                compressionOptions: {
                    algorithm: 'gzip',
                }
            })
        ],
    },
    runtimeCompiler: true
};
