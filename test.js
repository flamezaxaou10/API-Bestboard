var request = require("request");

var options = { method: 'PUT',
  url: 'https://api.netpie.io/microgear/TestProject01/testTemp',
  qs: { auth: 'uTY81hKIelqTLSU:25QwnqdyBCGK9wJg1jPptMWEw' },
  headers:
   { 'Postman-Token': '6098e331-a0be-4af2-b545-b215a9d2ff56',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: { t: '12', h: '30' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
