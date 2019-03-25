const path = require('path');

module.exports = {
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {
        '@client': path.resolve(__dirname, 'client/src/')
      }
    }
  }
};
