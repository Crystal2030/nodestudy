var url = require('url');
var querystring = require('querystring');

/**
 * Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: '#github.com:80/zhufeng?name=zfpx',
  search: null,
  query: null,
  pathname: 'http//zfpx:123',
  path: 'http//zfpx:123',
  href: 'http//zfpx:123#github.com:80/zhufeng?name=zfpx' }
 */
console.log(url.parse('http//zfpx:123#github.com:80/zhufeng?name=zfpx'));

//{ name: 'zfpx' }
console.log(querystring.parse('name=zfpx'));
