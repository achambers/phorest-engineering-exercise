/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    //pipeline: {
      //disable: {
        //allExcept: ['build', 's3']
      //}
    //},

    s3: {
      accessKeyId: 'AKIAIBC2CWYNK4BEUHCA',
      secretAccessKey: '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',
      bucket: 'test-apps-assets',
      region: 'us-east-1'
    },

    redis: {
      url: 'redis://redistogo:14e2cf801a97575c62429d18b6749092@angelfish.redistogo.com:9758',
      keyPrefix: 'phorest_vouchers'
    }
  };

  return ENV;
};
