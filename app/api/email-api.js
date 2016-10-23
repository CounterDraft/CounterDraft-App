"use strict";
/*  Title: Email-api
    Author:  Hubbert
    Date: Oct 23 2016
    Comment: 
        This is the api which is used for all email stuff.
*/


function EmailApi() {
    this.tag = 'email-api';
    var Promise = getPromise();
    var templates = getEmailTemplate();
    var ModelRegistrationUser = models.registration_user;
    var emailTemplateDir = require('path').join(__dirname, '../../templates/email');

    this.resetPassword = function(user_email, token) {
        var password_reset_template = emailTemplateDir + '/password_reset/password-reset.hbs';
        if (!user_email || !token) {
            logger.error('No user_email or token was provided to the reset api');
        }
        var emailOptions = {
            from: '"Do-Not-Reply" <do-not-reply@counterDraft.com>',
            subject: 'Reset Password'
        }

        var transporter = getEmailTransport();

        // Create a template based sender
        var templateSender = transporter.templateSender({
            render: function(context, callback) {
                templates.render(password_reset_template, context, function(err, html, text) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        html: html,
                        text: text
                    });
                });
            }
        }, emailOptions);

        // Message object, add mail specific fields here
        var message = {
            to: user_email
        };

        // context for the template renderer
        var context = {
            name: {
                last: 'Receiver',
                first: 'Name'
            }
        };

        console.log('Sending Mail');
        // send using template
        templateSender(message, context, function(error, info) {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            // print rfc822 message to console
            console.log('Generated mime-message source:\n%s', info.response.toString());
        });
    }

    this.registration = function(user_email) {
        var currentTime = new Date();

        new Promise(function(resolve, reject) {
            require('crypto').randomBytes(48, function(err, buffer) {
                var genToken = buffer.toString('hex');
                if (genToken) {
                    return resolve(genToken);
                } else {
                    return reject(err);
                }
            });
        }).then(function(token) {
            var vUntil = currentTime.setDate(currentTime.getDate() + 14);
            return ModelRegistrationUser.create({
                email_address: user_email,
                token: token,
                valid_until: vUntil
            });
        }).then(function(registration_user) {
            if (!registration_user) {
                var eo = {
                    email_address: user_email,
                    error: 9901
                }
                logger.error(self.getErrorApi().getErrorMsg(9901), {
                    error: eo
                });
                return new Promise(function(resolve, reject) {
                    return reject(eo);
                });
            }
            return new Promise(function(resolve, reject) {
                //TODO: fix this so we can use templates and look pretty;
                // var sendRegistrationConfirmation = emailTransport.templateSender(new eTemplate('templates/email/registration-confirmation.html'), sendRegistrationConfirmationEmailOptions);

                // sendRegistrationConfirmation({

                //     }, {

                //     },
                //     function(err, data) {
                //         if (err) {
                //             var eo = {
                //                 email_address: user_email,
                //                 error: errorNumberEmail
                //             }
                //             logger.error(errorMsgEmail, {
                //                 error: eo
                //             });
                //             return reject(err);
                //         } else {
                //             logger.info('Email confirmation sent to', { email_address: user_email });
                //             return resolve(data);
                //         }
                //     });

                var url_link;
                if (global.config.environment === 'production') {
                    url_link = 'http://' + config.server.ip + '/confirmation?token=' + registration_user.dataValues.token;
                } else {
                    url_link = 'http://' + config.server.ip + ':' + config.server.port + '/confirmation?token=' + registration_user.dataValues.token;
                }

                var sendRegistrationConfirmationEmailOptions = {
                    from: '"Do-Not-Reply" <do-not-reply@counterDraft.com>',
                    to: user_email,
                    subject: 'Email Confirmation',
                    html: '<div>Welcome to Counter Draft, a Fantasy sport experience!</div><br>' +
                        '<div>Please click on the link to confirmation your email and account</div><br>' +
                        '<a href="' + url_link + '">Confirmation</a>'
                };

                getEmailTransport().sendMail(sendRegistrationConfirmationEmailOptions, function(err, data) {
                    if (err) {
                        var eo = {
                            email_address: user_email,
                            error: 9902
                        }
                        logger.error(self.getErrorApi().getErrorMsg(9902), {
                            error: eo
                        });
                        return reject(err);
                    } else {
                        logger.info('Email confirmation sent to', { email_address: user_email });
                        return resolve(data);
                    }
                });
            });
        }).catch(function(err) {
            logger.error(err.toString(), { error: err });
        });
    }
}

module.exports = EmailApi;
