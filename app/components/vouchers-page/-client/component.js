import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  showVoucherField: false,
  voucherAmount: null,

  actions: {
    toggle() {
      this.toggleProperty('showVoucherField');
    },

    cancel() {
      this.set('voucherAmount', null);
      this.send('toggle');
    }
  }
});
