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
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                files: [{
                    src: 'build/js/min/<%= pkg.name %>.js',
                    dest: 'build/js/min/<%= pkg.name %>.min.js'
                }, {
                    src: ['node_modules/requirejs/*js'],
                    dest: 'build/js/r/require.min.js'
                }, {
                    src: ['build/js/r//text.js'],
                    dest: 'build/js/r/text.js'
                }]
            }
        },

        concat: {
            libsJS: {
                src: [
                    //libs NOTE- If we add more libs there need to be added to the build here;
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/underscore/underscore.js',
                    'node_modules/backbone/backbone.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js'
                ],
                dest: 'build/js/min/<%= pkg.name %>.js'
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
                    baseUrl: "build/js/",
                    modules: [{
                        name: "about-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "careers-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "contact-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "create-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "faq-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "forgot-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "home-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "legal-page",
                        exclude: [
                            "common-build"
                        ]
                    }, {
                        name: "signin-page",
                        exclude: [
                            "common-build"
                        ]
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
        'requirejs',
        'concat',
        'less',
        'uglify',
        'clean:post'
    ]);

    // Default task(s).
    grunt.registerTask('development', [
        'clean:pre',
        'copy',
        'requirejs',
        'concat',
        'less',
        'uglify',
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
