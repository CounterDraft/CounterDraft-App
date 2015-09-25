"use strict"; //Defines that JavaScript code should be executed in "strict mode".

var title = 'login';
console.log('login main section');

$('a.active-reset').on('click', function(event) {
    $('div.retrieve-container').toggleClass('active');
});
