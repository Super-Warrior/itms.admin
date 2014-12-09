'use strict';

define([
	'spec/SpecHelper',
	'src/app/services/demoServices'
	],

    function(jasmine , demoService) {

    describe('Testing Demo services', function() {

        beforeEach(function() {

        });

        it('should be able to say something', function() {
            var sentens=demoService.saySomething("I love jasmine!");
            var expectedResult="Hi,you want to say: "+"I love jasmine!";
            expect(sentens).toEqual(expectedResult);
        });


    });

});