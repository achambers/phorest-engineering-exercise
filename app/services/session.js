import Service from '@ember/service';

export default Service.extend({
  currentTenant: null,
  currentUser: null,

  init() {
    this._super(...arguments);

    //This would have been set at some point when booting the app
    this.set('currentTenant', {
      id: 'eTC3QY5W3p_HmGHezKfxJw'
    });
  }
});
