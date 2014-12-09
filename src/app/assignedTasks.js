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

require(['viewmodels/assignedTasksViewModel'], function (assignedTasksViewModel) {
    ko.applyBindings(assignedTasksViewModel);
});
