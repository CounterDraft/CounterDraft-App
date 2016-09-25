module.exports = function(grunt) {
    var myConfig = config;
    var db_url = getDatabase_url();

    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["./css/"],
                    compress: false
                },
                files: {
                    "./css/counter-main.css": "./css/counter-main.less"
                }
            }
        },
        watch: {
            files: ["./css/*"],
            tasks: ["less"],
            options: {
                nospawn: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['less', 'watch']);

};
