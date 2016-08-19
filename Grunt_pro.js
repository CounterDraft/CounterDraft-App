module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            pre: ['build'],
            post: ['build/js/base',
                'build/js/main',
                'build/js/modules',
                'build/js/*js',
                'build/css/css',
                'build/css/*less'
            ]
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            js: {
                files: [{
                    src: ['node_modules/requirejs/*js'],
                    dest: 'build/js/r/require.min.js'
                }, {
                    src: ['build/js/text.js'],
                    dest: 'build/js/r/text.js'
                }, {
                    //NOTE- new js Modules files go here.
                    src: ['build/js/r/min/<%= pkg.name %>.js',
                        'build/js/main/about-main.js',
                        'build/js/main/bad-main-main.js',
                        'build/js/main/careers-main.js',
                        'build/js/main/contact-main.js',
                        'build/js/main/create-account-main.js',
                        'build/js/main/dashboard-main.js',
                        'build/js/main/faq-main.js',
                        'build/js/main/forgot-main.js',
                        'build/js/main/legal-main.js',
                        'build/js/main/login-main.js',
                        'build/js/main/meet-the-team-main.js',
                        'build/js/main/signin-main.js',
                        'build/js/main/terms-of-service-main.js'
                    ],
                    dest: 'build/js/r/min/<%= pkg.name %>.min.js'
                }]
            }
        },

        concat: {
            libsJS: {
                src: [
                    //NOTE- If we add more libs there need to be added to the build here;
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/underscore/underscore.js',
                    'node_modules/angular/angular.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'build/js/common.js'
                ],
                dest: 'build/js/r/min/<%= pkg.name %>.js'
            }
        },

        copy: {
            js: {
                expand: true,
                src: ['js/*', 'js/*/*', 'js/*/*/*', 'js/*/*/*/*'],
                dest: 'build/'
            },

            css: {
                src: 'css/*less',
                dest: 'build/'
            }

            // pages: {
            //     expand: true,
            //     src: ['views/*/*ejs'],
            //     dest: 'build/'
            // }
        },

        less: {
            compile: {
                options: {
                    compress: true,
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'build/css/<%= pkg.name %>.css.map'
                },
                files: {
                    'build/css/<%= pkg.name %>.min.css': 'css/counter-main.less'
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    optimize: "uglify",
                    baseUrl: "build/js/r/main/",
                    modules: [{
                        name: "about-main"
                    }, {
                        name: "bad-main"
                    }, {
                        name: "careers-page"
                    }, {
                        name: "login-page"
                    }, {
                        name: "contact-page"
                    }, {
                        name: "create-page"
                    }, {
                        name: "faq-page"
                    }, {
                        name: "forgot-page"
                    }, {
                        name: "home-page"
                    }, {
                        name: "legal-page"
                    }, {
                        name: "signin-page"
                    }],
                    dir: "build/js/r"
                }
            }
        }
    });

    //load all tasks;
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:pre',
        'copy',
        'concat',
        'uglify',
        'less',
        'clean:post'
    ]);

    // Default task(s).
    grunt.registerTask('development', [
        'clean:pre',
        'copy',
        'requirejs',
        'uglify',
        'concat',
        'less',
        'clean:post'
    ]);

    // Default task(s).
    grunt.registerTask('production', [
        'clean:pre',
        'copy',
        'requirejs',
        'concat',
        'less',
        'uglify',
        'clean:post'
    ]);
};
