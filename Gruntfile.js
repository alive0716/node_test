module.exports=function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options:{ separator: ';' },
            dist: {
                src: ['public/javascripts/*.js'],
                dest: 'public/jsmini/<%=pkg.name %>.js'
            }
        },
        uglify: {
            options: {

            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['concat', 'uglify'])

