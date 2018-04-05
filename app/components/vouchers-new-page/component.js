import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import fetch from 'fetch';

export default Component.extend({
  searchClients: task(function* (term) {
    yield timeout(600);
    let username = 'global%2Fcloud%40apiexamples.com';
    let password = 'VMlRo%2Feh%2BXd8M~l';
    let tenantId = 'eTC3QY5W3p_HmGHezKfxJw';
    let host = 'api-gateway-dev.phorest.com';
    let url = `http://${host}/third-party-api-server/api/business/${tenantId}/client?phone=${term}`;
    let options = {
      headers: {
        'Authorization': 'Basic Z2xvYmFsL2Nsb3VkQGFwaWV4YW1wbGVzLmNvbTpWTWxSby9laCtYZDhNfmw='
      }
    };

    return fetch(url, options).then((resp) => resp.json()).then((json) => json._embedded.clients);
  })
});
