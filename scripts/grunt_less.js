module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["../css/"],
                    yuicompress: true
                },
                files: {
                    "../css/counter-main.css": "../css/counter-main.less"
                }
            }
        },
        watch: {
            files: "../css/*",
            tasks: ["less"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};