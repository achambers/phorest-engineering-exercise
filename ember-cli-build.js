'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'http://test-apps-assets.s3-website-us-east-1.amazonaws.com/'
    }
  });

  return app.toTree();
};
