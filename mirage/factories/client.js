import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  clientId : 'ZyOj1R5bO2wvT2BPGYazhQ',
  version : 1,
  firstName : faker.name.firstName(),
  lastName : faker.name.lastName(),
  mobile : '888888855599222',
  email : 'techtest@phorest.com',
  clientSince : '2017-08-01T16:01:07.000Z',
  notes : '0',
  smsMarketingConsent : true,
  emailMarketingConsent : true,
  smsReminderConsent : true,
  emailReminderConsent : true,
  creatingBranchId : 'SE-J0emUgQnya14mOGdQSw',
  archived : false
});
