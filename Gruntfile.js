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
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},
		concat: {
			js_libs: {
				src: 'public/js/libs/jquery.*.js',
				dest: 'public/js/libs/jquery-plugins.js'
			}
		},
		coffee: {
			compileJoined: {
				options: {
					join: true,
					bare: true
				},
				files: {
					'public/js/application.js': 'src/app/**/*.coffee'
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
				dest: 'public/js/templates.js'
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
			},
			js_libs: {
				files: 'public/js/jquery.*.js',
				tasks: ['concat']
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-html2js');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'coffee', 'html2js', 'concat']);
};