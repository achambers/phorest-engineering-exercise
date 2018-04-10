import { module, test } from 'qunit';
import {
  visit,
  fillIn,
  click
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | create voucher', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('no clients exist for search criteria', async function(assert) {
    assert.expect(1);

    this.server.db.clients.remove();

    await visit('/vouchers');

    await fillIn(this.element.querySelector('[data-test-client-search-field]'), 'foobar');

    assert.equal(this.element.querySelector('[data-test-no-results]').textContent.trim(), 'No results', 'No results returned from client search');
  });

  test('creating a voucher for a client', async function(assert) {
    assert.expect(7);

    this.server.create('client', { firstName: 'CHEESE', mobile: null, email: 'techtest@phorest.com' });
    this.server.create('client', { firstName: 'BACON', mobile: '888888855599222', email: null });

    await visit('/vouchers');

    await fillIn(this.element.querySelector('[data-test-client-search-field]'), 'techtest@phorest.com');

    assert.equal(this.element.querySelectorAll('[data-test-client]').length, 1, 'Client returned for email search');
    assert.equal(this.element.querySelector('[data-test-client]').textContent.trim(), this.server.db.clients[0].firstName, 'Client results details displayed');

    await fillIn(this.element.querySelector('[data-test-client-search-field]'), '888888855599222');

    assert.equal(this.element.querySelectorAll('[data-test-client]').length, 1, 'Client returned for phone search');
    assert.equal(this.element.querySelector('[data-test-client]').textContent.trim(), this.server.db.clients[1].firstName, 'Client results details displayed');

    await click(this.element.querySelector('[data-test-client]'));

    assert.ok(this.element.querySelector('[data-test-selected-client]'), 'Client is selected');

    await fillIn(this.element.querySelector('[data-test-voucher-amount-field]'), '20');
    await click(this.element.querySelector('[data-test-create-voucher-button]'));

    assert.equal(this.element.querySelector('[data-test-voucher-id]').textContent.trim(), 'akLKuiOtpkQfl_QZZfDt0g', 'Voucher created and voucher id displayed');

    await click(this.element.querySelector('[data-test-done-button]'));

    assert.equal(this.element.querySelectorAll('[data-test-voucher-id]').length, 0, 'Voucher creation hidden and search results restored');
  });
});
