import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import fetch from 'fetch';

export default Component.extend({
  searchClients: task(function* (term) {
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

    return fetch(url, options).then((resp) => resp.json()).then((json) => json._embedded.clients);
  }).restartable()
});
