/*  Title: filters
    Author:  Hubbert
    Date: Feb 17 2017
    Comment:  
        All filters should be place here.
*/
app.filter('place', function() {
    return function(input, optional1, optional2) {
        if (input === 1) {
            return '1st';
        }
        return input.toString() + 'nd';
    }
});
