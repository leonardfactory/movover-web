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
					join: true,
					bare: true
				},
				files: {
					'js/application.js': 'src/app/**/*.coffee'
				}
			}
		},
		html2js: {
			options: {
				// custom options, see below
				base: 'src/partials'    
			},
			main: {
				src: ['src/partials/**/*.tpl.html'],
				dest: 'js/templates.js'
			},
		},
		watch: {
			application_code: {
				files: 'src/app/**/*.coffee',
				tasks: ['coffee']
			},
			templates_code: {
				files: 'src/partials/**/*.tpl.html',
				tasks: ['html2js']
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
	grunt.loadNpmTasks('grunt-html2js');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'coffee']);
};