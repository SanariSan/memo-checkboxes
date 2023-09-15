module.exports = function override(config, env) {
  config.plugins.forEach((plugin) => {
    if (
      plugin?.__proto__?.constructor?.pluginName === "mini-css-extract-plugin"
    ) {
      plugin.options.ignoreOrder = true;
    }
  });
  return config;
};
