module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            pre: ['build'],
            post: ['build/js/controllers',
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
                    //NOTE- All controllers should go here;
                    src: ['build/js/min/<%= pkg.name %>.js',
                        'build/js/controllers/account-controller.js'
                    ],
                    dest: 'build/js/min/<%= pkg.name %>.min.js'
                }]
            }
        },

        concat: {
            libsJS: {
                src: [
                    //NOTE- If we add more libs there need to be added to the build here;
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/angular/angular.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'build/js/common.js'
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
        }
    });

    //load all tasks;
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:pre',
        'copy',
        'concat',
        'uglify',
        'less',
        'clean:post'
    ]);
};
