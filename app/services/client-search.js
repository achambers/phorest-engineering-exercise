import Service from '@ember/service';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import config from 'phorest-vouchers/config/environment';

export default Service.extend({
  session: service(),

  byEmail(term) {
    if (!term) { return; }

    let options = this._requestOptions();
    let url = this._requestUrl();
    url = `${url}?email=${term}`;

    return this._fetch(url, options)
      .then(json => this._handleResponse(json));
  },

  byPhone(term) {
    if (!term) { return; }

    let options = this._requestOptions();
    let url = this._requestUrl();
    url = `${url}?phone=${term}`;

    return this._fetch(url, options)
      .then(json => this._handleResponse(json));
  },

  _fetch(url, options) {
    return fetch(url, options).then(resp => resp.json());
  },

  _requestOptions() {
    let username = 'global/cloud@apiexamples.com';
    let password = 'VMlRo/eh+Xd8M~l';
    let authToken = btoa(`${username}:${password}`);

    let options = {
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    };

    return options;
  },

  _requestUrl() {
    let tenantId = this.get('session.currentTenant.id');

    return `${config.apiHost}/third-party-api-server/api/business/${tenantId}/client`;
  },

  _handleResponse(json) {
    return (json._embedded && json._embedded.clients) || [];
  }
});
