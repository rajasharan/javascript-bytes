module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            test: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['mochaTest']
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: false //true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', 'mochaTest');
    grunt.registerTask('serve', ['connect:server', 'watch']);
};
