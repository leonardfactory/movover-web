module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					compass: true
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		coffee: {
			compileJoined: {
				options: {
					join: true
				},
				files: {
					'js/application.js': 'src/app/**/*.coffee'
				}
			}
		},
		watch: {
			application_code: {
				files: 'src/app/**/*.coffee',
				tasks: ['coffee']
			},
			sass_styles: {
				files: 'sass/*.scss',
				tasks: ['sass']
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'coffee']);
};