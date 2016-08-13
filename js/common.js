/*  Title: Common JS
    Author:  Hubbert
    Date: Aug 16 2016
    Comment:  
        This defines and creates out JS 
        tool object, used to store data 
        and retrive it.
*/

(function($, window) {

    var init = function init() {

        //bootstrap vaildation patterns;
        var patterns = {
            'input_name': { pattern: "^[a-zA-Z]+$", msg: "Invalid name specified." },
            'input_numbers_only': { pattern: "^[0-9]*$", msg: "Input data must be numeric." },
            'input_phone': { pattern: "0[0-8]\\d{8}|04\\d{2}[\\s]\\d{3}[\\s]\\d{3}|0[0-8][\\s]\\d{4}[\\s]\\d{4}$", msg: "Invalid Phone Number. Expected format: 0123456789." }
        }

        this.getPattern = function (name) {
            if (patterns[name]) {
                return patterns[name];
            }
            return false;
        }
    }

    var Navigation = function navigation() {
        this.set = function(title){
            $('ul.navbar-nav li').removeClass('active');
            $('ul.navbar-nav li.' + title + '-nav').addClass('active');
            //add other navgation items if needed.
        }

    }
    var Alert = function alert() {

        this.timeout = null;

        this.showMessage = function(msg, msgType) {
            if (!msgType || typeof(msgType) === "undefined") {
                return false;
            }

            var ms;
            var $msgBox = $('#msg-dialog');
            switch (msgType.toLowerCase()) {
                case 'success':
                    ms = 'alert-success';
                    break;
                case 'info':
                    ms = 'alert-info';
                    break;
                case 'warning':
                    ms = 'alert-warning';
                    break;
                case 'danger':
                    ms = 'alert-danger';
                    break;
                default:
                    ms = 'alert-unknown';
                    break;
            }
            $msgBox.find('span').html(msg);
            $msgBox.addClass(ms);
            $msgBox.addClass('active');

            //add timer of 5 secs to dismiss if the alert isn't a danger message;
            if (ms != 'danger') {
                this.timeout = setTimeout($.proxy(function() {
                    this.hide();
                }, this), [10000]);
            }

        }
    }
    var Load = function load() {
        this.showLoader = function(shouldShow) {
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
        }

    }
    window.Counter = new init();
    window.Counter.navgation = new Navigation();
    window.Counter.alert = new Alert();
    window.Counter.load = new Load();
  
})(jQuery, window);




// window.Counter = {
//     init: function() {
//         //add listener to #msg-dialog;
//         $('div#msg-dialog i.modal-close').on('click', $.proxy(function(events) {
//             events.stopPropagation();
//             this.message.hide();
//             return false;
//         }, this));
//     },

//     Navigation: {
//         set: function(title) {
//             $('ul.navbar-nav li').removeClass('active');
//             $('ul.navbar-nav li.' + title + '-nav').addClass('active');
//             //add other navgation items if needed.
//         }

//     },

//     //TODO: There has to be a better way to accompish this with angularjs?
//     message: {
//         timeout: null,

//         showMessage: function(msg, msgType) {
//             if (!msgType || typeof(msgType) === "undefined") {
//                 return false;
//             }

//             var ms;
//             var $msgBox = $('#msg-dialog');
//             switch (msgType.toLowerCase()) {
//                 case 'success':
//                     ms = 'alert-success';
//                     break;
//                 case 'info':
//                     ms = 'alert-info';
//                     break;
//                 case 'warning':
//                     ms = 'alert-warning';
//                     break;
//                 case 'danger':
//                     ms = 'alert-danger';
//                     break;
//                 default:
//                     ms = 'alert-unknown';
//                     break;
//             }
//             $msgBox.find('span').html(msg);
//             $msgBox.addClass(ms);
//             $msgBox.addClass('active');

//             //add timer of 5 secs to dismiss if the alert isn't a danger message;
//             if (ms != 'danger') {
//                 this.timeout = setTimeout($.proxy(function() {
//                     this.hide();
//                 }, this), [10000]);
//             }
//         },

//         clear: function() {
//             $('#msg-dialog span').html('');
//             return true;
//         },

//         hide: function() {
//             if(this.timeout){
//                 clearTimeout(this.timeout);
//             }

//             $('div#msg-dialog').removeClass(function(index, css) {
//                     return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
//                 })
//                 .removeClass('active');
//             return true;
//         }
//     },

//     showLoader: function(shouldShow) {
//         var $loader = $('#counter-load');
//         var className = 'active';
//         if (shouldShow === true) {
//             $loader.toggleClass(className);
//         } else if (shouldShow === false) {
//             $loader.removeClass(className);
//         } else {
//             $loader.toggleClass(className);
//         }
//         return false;
//     },

//     googleAnalytics: {
//         ga: function() {
//             console.log('loaded' + arguments);
//         }
//     },

//     showSignin: function() {
//         this.googleAnalytics.ga('signin');

//         require(['modules/signin/views/signin-view',
//             'modules/signin/models/signin-model',
//             'base/modal'
//         ], function(SigninView, SigninModel, Modal) {

//             var signinView = new SigninView({
//                 model: new SigninModel()
//             });

//             new Modal({
//                 view: signinView,
//                 templateType: 0
//             }).render().show();


//         });
//     }
// }
