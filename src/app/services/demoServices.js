define([],function(){

    var saySomething=function(words){
        return "Hi,you want to say: " + words;
    };

    return{
        salutation:"Hi,this is the data from the service!",
        saySomething:saySomething
    }
});