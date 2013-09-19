module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			dist: {
				src: ['src/js/**/*.js'],
				dest: 'js/application.js',
			}
		},
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
					'js/application.js': 'src/**/*.coffee'
				}
			}
		}
		watch: {
			ember_templates: {
				files: 'src/templates/**/*.handlebars',
				tasks: ['emberTemplates']
			},
			application_code: {
				files: 'src/js/**/*.js',
				tasks: ['concat']
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};