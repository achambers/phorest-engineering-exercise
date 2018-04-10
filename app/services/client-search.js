import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  fetch: service(),

  async byEmail(term) {
    if (!term) { return; }

    let path = `/client?email=${term}`;

    let response = await this.get('fetch').fetch(path);
    let json = await response.json();

    return this._handleResponse(json);
  },

  async byPhone(term) {
    if (!term) { return; }

    let path = `/client?phone=${term}`;

    let response = await this.get('fetch').fetch(path);
    let json = await response.json();

    return this._handleResponse(json);
  },

  _handleResponse(json) {
    return (json._embedded && json._embedded.clients) || [];
  }
});
