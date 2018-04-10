import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',

  client: null,
  'on-done': () => {},
  'on-cancel': () => {},

  voucherId: null,
  voucherAmount: null,

  vouchers: service(),

  _createVoucher: task(function * (client, amount) {
    amount = this._validateAmount(amount);

    let vouchers = this.get('vouchers');

    let voucher = yield vouchers.generate(client, amount);

    this.set('voucherId', voucher.voucherId);
  }).drop(),

  _validateAmount(amount) {
    // Obviously this would be validated in a sensible way
    return parseFloat(amount);
  },

  actions: {
    handleCreateVoucher(client, amount, event) {
      event.preventDefault();
      this.get('_createVoucher').perform(client, amount);
    },

    handleEmail() {
      alert('This voucher will be email to the client');
    }
  }
});
