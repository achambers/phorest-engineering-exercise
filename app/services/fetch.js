import Service from '@ember/service';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

import config from 'phorest-vouchers/config/environment';

const USERNAME = 'global/cloud@apiexamples.com';
const PASSWORD = 'VMlRo/eh+Xd8M~l';

export default Service.extend({
  session: service(),

  fetch(path, options = {}) {
    let url = `${this._basePath()}${path}`;
    let authToken = btoa(`${USERNAME}:${PASSWORD}`);

    let defaultOptions = {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json'
      }
    };

    options = Object.assign({}, options, defaultOptions);

    return fetch(url, options);
  },

  _basePath() {
    let businessId = this.get('session.businessId');

    return `${config.apiHost}/${config.apiBasePath}/business/${businessId}`;
  }
});
