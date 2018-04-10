import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),
  fetch: service(),

  async generate(client, amount) {
    let branchId = this.get('session.branchId');
    let path = '/voucher';
    let options = {
      method: 'POST',
      body: JSON.stringify({
        clientId: client.clientId,
        originalBalance: amount,
        issueDate: '2018-04-09T14:00:00.000Z',
        creatingBranchId: branchId,
        expiryDate: '2018-04-16T14:00:00.000Z'
      })
    };

    let response = await this.get('fetch').fetch(path, options);
    let json = await response.json();

    return json;
  }
});
