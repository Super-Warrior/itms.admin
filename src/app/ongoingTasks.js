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

require(['viewmodels/ongoingTasksViewModel'], function (ongoingTasksViewModel) {
    ko.applyBindings(ongoingTasksViewModel);
});
