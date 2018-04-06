import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';

export default Component.extend({
  tagName: '',

  publicApi: null,

  clientSearch: service(),

  init() {
    this._super(...arguments);

    this.set('publicApi', {});
  },

  debouncedSearch: task(function* (term) {
    if (!term) {
      setProperties(this.get('publicApi'), {
        clients: null,
        term: null
      });
      return;
    }

    yield timeout(250);

    let clients = yield this.get('search').perform(term);

    setProperties(this.get('publicApi'), {
      clients,
      term
    });
  }).restartable(),

  search: task(function* (term) {
    let emailResults = yield this.get('clientSearch').byEmail(term);

    if (emailResults.length) { return emailResults; }

    return yield this.get('clientSearch').byPhone(term);
  })
});
