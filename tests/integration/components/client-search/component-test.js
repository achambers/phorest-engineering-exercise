import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'phorest-vouchers/initializers/ember-cli-mirage';

const REQUEST_URL = 'http://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client';

module('Integration | Component | client-search', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('No results returned', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#client-search as |search|}}
        <div class="client-count">{{search.clients.length}}</div>
        <div class="client-name">{{search.clients.firstObject.firstName}}</div>
      {{/client-search}}
    `);

    this.server.get(REQUEST_URL, () => {
      return {};
    }); 
    await fillIn('[data-test-search-box]', 'foobar');

    await settled();

    let noResultsText = this.element.querySelector('[data-test-no-results]').textContent.trim();
    assert.equal(noResultsText, 'No results', 'No results are found for invalid search');
  });

  test('Results returned for email', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#client-search as |search|}}
        <div class="client-count">{{search.clients.length}}</div>
        <div class="client-name">{{search.clients.firstObject.firstName}}</div>
      {{/client-search}}
    `);

    this.server.get(REQUEST_URL, (schema, req) => {
      if (req.queryParams.email) {
        return {
          _embedded: {
            clients: [
              { firstName: 'CHEESE' }
            ]
          }
        };
      } else {
        return {};
      }
    });

    await fillIn('[data-test-search-box]', 'techtest@phorest.com');

    await settled();

    let resultCount = this.element.querySelector('.client-count').textContent.trim();
    assert.equal(resultCount, '1', '1 email result returned');

    let resultText = this.element.querySelector('.client-name').textContent.trim();
    assert.equal(resultText, 'CHEESE', 'Client returned for email');
  });

  test('Results returned for phone', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#client-search as |search|}}
        <div class="client-count">{{search.clients.length}}</div>
        <div class="client-name">{{search.clients.firstObject.firstName}}</div>
      {{/client-search}}
    `);

    this.server.get(REQUEST_URL, (schema, req) => {
      if (req.queryParams.phone) {
        return {
          _embedded: {
            clients: [
              { firstName: 'BACON' }
            ]
          }
        };
      } else {
        return {};
      }
    });

    await fillIn('[data-test-search-box]', 'techtest@phorest.com');

    await settled();

    let resultCount = this.element.querySelector('.client-count').textContent.trim();
    assert.equal(resultCount, '1', '1 phone result returned');

    let resultText = this.element.querySelector('.client-name').textContent.trim();
    assert.equal(resultText, 'BACON', 'Client returned for phone');
  });
});
