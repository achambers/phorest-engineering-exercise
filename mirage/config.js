export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://api-gateway-dev.phorest.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'third-party-api-server/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('business/:id/client', (schema, req) => {
    let clients = schema.db.clients.where({ email: req.queryParams.email })
      .concat(schema.db.clients.where({ mobile: req.queryParams.phone }));

    if (clients.length) {
      return {
        _embedded : { clients },
        page : {
          size : clients.length,
          totalElements : clients.length,
          totalPages : 1,
          number : 0
        }
      };
    } else {
      return {
        page : {
          size : 0,
          totalElements : 0,
          totalPages : 0,
          number : 0
        }
      };
    }
  });

  this.post('business/:id/voucher', (schema, req) => {
    var params = JSON.parse(req.requestBody);

    return Object.assign(params, {
      voucherId: 'akLKuiOtpkQfl_QZZfDt0g',
      serialNumber: '10772'
    })
  });
}
