// Polyfills for older browsers
if (!window.Promise) {
  window.Promise = require('promise-polyfill');
}

if (!Object.assign) {
  Object.assign = require('object-assign');
}

if (!window.fetch) {
  require('whatwg-fetch');
}