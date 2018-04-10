import Service from '@ember/service';
import { setProperties } from '@ember/object';

export default Service.extend({
  businessId: null,
  branchId: null,

  init() {
    this._super(...arguments);

    //This would have been set at some point when booting the app
    setProperties(this, {
      businessId: 'eTC3QY5W3p_HmGHezKfxJw',
      branchId: 'SE-J0emUgQnya14mOGdQSw'
    });
  }
});
