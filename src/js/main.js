require("babel-polyfill");

const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
const sleep = require('js-util/sleep');

const pageId = document.querySelector('.l-page').getAttribute('data-page-id');
const ua = window.navigator.userAgent;
const link = document.querySelector('link[as=style]');

const init = async () => {
  // preload stylesheet other than Google Chrome browser.
  if (ua.indexOf('Edge') > -1 || ua.indexOf('Chrome') < 0) link.rel = 'stylesheet';

  await sleep(100);

  // Making viewport units (vh|vw|vmin|vmax) work properly in Mobile Safari.
  viewportUnitsBuggyfill.init();

  // run initialize function.
  require ('./init/common.js').default();
  switch (pageId) {
    case 'index':
      require ('./init/index.js').default();
      break;
    default:
  }
}
init();
