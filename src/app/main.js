require.config({
    paths: {
        'underscore': '../vendor/underscore/underscore'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['viewmodels/mainViewModel'], function (mainViewModel) {
    ko.applyBindings(mainViewModel);
});
