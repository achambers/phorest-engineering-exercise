import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import fetch from 'fetch';
import { computed } from '@ember/object';

export default Component.extend({
  term: null,

  clients: computed('term', async function() {
    let term = this.get('term');

    let clients = await this.get('_searchClients').perform(term)

    return clients;
  }),

  _searchClients: task(function* (term) {
    yield timeout(600);

    let tenantId = 'eTC3QY5W3p_HmGHezKfxJw';
    let username = 'global/cloud@apiexamples.com';
    let password = 'VMlRo/eh+Xd8M~l';
    let authToken = btoa(`${username}:${password}`);
    let url = `http://api-gateway-dev.phorest.com/third-party-api-server/api/business/${tenantId}/client?phone=${term}`;

    let options = {
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    };

    let json = yield fetch(url, options).then((resp) => resp.json());

    return json._embedded && json._embedded.clients;
  }).restartable()
});
