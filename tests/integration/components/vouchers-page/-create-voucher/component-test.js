import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Component | vouchers-page/-create-voucher', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('cancelling voucher creation', async function(assert) {
    assert.expect(1);

    this.set('cancelHandler', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{vouchers-page/-create-voucher
        on-cancel=cancelHandler
      }}
    `);

    await click(this.element.querySelector('[data-test-cancel-button]'));
  });

  test('creating a voucher', async function(assert) {
    assert.expect(2);

    this.server.post('business/:id/voucher', (schema, req) => {
      let json = JSON.parse(req.requestBody);

      assert.equal(json.originalBalance, 30)

      return Object.assign({}, json, { voucherId: 'CHEESE' });
    });

    this.set('client', { clientId: '111' });

    await render(hbs`
      {{vouchers-page/-create-voucher
        client=client
      }}
    `);

    await fillIn(this.element.querySelector('[data-test-voucher-amount-field]'), 30);

    await click(this.element.querySelector('[data-test-create-voucher-button]'));

    assert.equal(this.element.querySelector('[data-test-voucher-id]').textContent.trim(), 'CHEESE')
  });
});
