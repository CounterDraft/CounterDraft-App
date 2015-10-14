"use restrict"; // restrict mode for JavaScript;

$(document).ready(function() {
    //add listener to message box;
    $('div.msg-dialog i.modal-close').on('click', function(events) {
        events.stopPropagation();
        $('div.msg-dialog').removeClass(function(index, css) {
                return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
            })
            .toggleClass('hidden')
            .html('').find('span').html('');
        return false;
    });

});


window.Counter = {
    Navigation: {
        set: function(title) {
            $('ul.navbar-nav li').removeClass('active');
            $('ul.navbar-nav li.' + title + '-nav').addClass('active');
            //add other navgation items if needed.
        }

    },

    showMessage: function(msg, msgType){
        console.log('we will show this message ' + msg + ' for message type=' + msgType);
    },

    showLoader: function(shouldShow) {
        var $loader = $('#counter-load');
        var className = 'active';
        if (shouldShow === true) {
            $loader.toggleClass(className);
        } else if (shouldShow === false) {
            $loader.removeClass(className);
        } else {
            $loader.toggleClass(className);
        }
        return false;
    },

    googleAnalytics: {
        ga: function() {
            console.log('loaded' + arguments);
        }
    },

    showSignin: function() {
        this.googleAnalytics.ga('signin');

        require(['modules/signin/views/signin-view',
            'modules/signin/models/signin-model',
            'base/modal'
        ], function(SigninView, SigninModel, Modal) {

            var signinView = new SigninView({
                model: new SigninModel()
            });

            new Modal({
                view: signinView,
                templateType: 0
            }).render().show();


        });
    }
}
