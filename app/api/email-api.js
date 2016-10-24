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
    var emailTemplateDir = require('path').join(__dirname, '../../templates/email');
    var moment = getMoment();
    var transporter = getEmailTransport();

    this.resetPassword = function(user, token) {
        var password_reset_template = emailTemplateDir + '/password_reset/password_reset.hbs';
        if (!user || !token) {
            logger.error('No user_email or token was provided to the reset api');
        }
        var emailOptions = {
            from: '"Do-Not-Reply" <do-not-reply@counterDraft.com>',
            subject: 'Reset Password'
        }

        var message = { to: user.email_address }

        var context = {
            user: user,
            url_link: "https://" + token,
            expire_time: moment().format()
        }

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

        templateSender(message, context, function(error, info) {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            logger.info('Reset password email sent to - ', { email_address: user.email_address, info: info.response.toString() });
        });
    }

    this.registration = function(user, token) {
        var password_reset_template = emailTemplateDir + '/registration_confirmation/registration-confirmation.hbs';
        if (!user || !token) {
            logger.error('No user_email or token was provided to the reset api');
        }
        new Promise(function(resolve, reject) {
            var url_link;

            if (global.config.environment === 'production') {
                url_link = 'http://' + config.server.ip + '/confirmation?token=' + token;
            } else {
                url_link = 'http://' + config.server.ip + ':' + config.server.port + '/confirmation?token=' + token;
            }

            var message = { to: user.email_address };

            var emailOptions = {
                from: '"Do-Not-Reply" <do-not-reply@counterDraft.com>',
                subject: 'Email Confirmation'
            }

            var context = {
                user: user,
                url_link: url_link
            }


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

            templateSender(message, context, function(error, info) {
                if (err) {
                    var eo = {
                        email_address: user.email_address,
                        error: 9902
                    }
                    logger.error(self.getErrorApi().getErrorMsg(9902), {
                        error: eo
                    });
                    return reject(err);
                } else {
                    logger.info('Email confirmation sent to', { email_address: user.email_address });
                    return resolve(info);
                }
            });
            // getEmailTransport().sendMail(sendRegistrationConfirmationEmailOptions, function(err, data) {
            //     if (err) {
            //         var eo = {
            //             email_address: user_email,
            //             error: 9902
            //         }
            //         logger.error(self.getErrorApi().getErrorMsg(9902), {
            //             error: eo
            //         });
            //         return reject(err);
            //     } else {
            //         logger.info('Email confirmation sent to', { email_address: user_email });
            //         return resolve(data);
            //     }
            // });
        }).catch(function(err) {
            logger.error(err.toString(), { error: err });
        });
    }
}

module.exports = EmailApi;
