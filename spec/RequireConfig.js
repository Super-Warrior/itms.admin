var require = {
  //baseUrl: 'src/',

  // bust cache on development
  // should be removed for deployed code
  urlArgs: "bust=" +  (new Date()).getTime(),

  paths: {
    'domReady': 'src/lib/jasmine/domReady',
    'jasmine': 'src/lib/jasmine/jasmine',
    'jasmine-html': 'src/lib/jasmine/jasmine-html'
  },

  shim: {
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': ['jasmine']
  }
};