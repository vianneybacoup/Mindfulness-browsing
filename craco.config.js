module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
                    content: './src/static/content.ts',
                    background: './src/static/background.ts'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js'
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false
                }
            }
        },
    }
 }