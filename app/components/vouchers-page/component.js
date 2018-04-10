import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';

export default Component.extend({
  tagName: '',

  term: null,
  clients: null,
  selectedClient: null,

  clientSearch: service(),

  debouncedSearch: task(function * (term) {
    term = term || null;

    setProperties(this, {
      term: null,
      clients: null
    });

    yield timeout(300);

    let clients = yield this.get('_searchClients').perform(term);

    setProperties(this, { term, clients });
  }).restartable(),

  _searchClients: task(function * (term) {
    let clientSearch = this.get('clientSearch');

    let clients = yield clientSearch.byEmail(term);

    if (!clients.length) {
      clients = yield clientSearch.byPhone(term);
    }

    return clients;
  }),

  actions: {
    reset() {
      this.set('selectedClient', null);
    }
  }
});
