module.exports = function (api) {
    let config_env = api.cache(() => process.env.ENV);
    console.log('babel-config-env', config_env);

    let plugins = [];

    if (config_env == 'production') {
        plugins.push('transform-remove-console');
    }

    return {
        presets: ['@babel/preset-env'],
        plugins: plugins
    };
};
