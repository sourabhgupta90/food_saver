'use strict';

/*
 * dpk22dev **, * patterns due to glob
 */

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'], 
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css'],
		mochaTests: ['app/tests/**/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
                // take care watcher is watching only below mentioned dir/files
                // if dir/file is created in other dir remember to put in watcher if necessary
		watch: { // create a watch on 
			serverViews: { // above defined in watchFiles object
				files: watchFiles.serverViews,
				options: {
					livereload: true // auto reload on browser in case serverViews file changes
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],  // what task to do if watched file is changed, task names are mentioned below
                                // run jshint in case serverJS files get changed
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: { // what does jshint task mean
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS), // concat array for server and client side js for jshint 
				options: {
					jshintrc: true // read hidden .jshintrc file
                                        //Be aware that jshintrc settings are not merged with your Grunt options.
                                        // it is correct way, we specify true/false only; not give file name explicitly
				}
			}
		},
		csslint: { // csslint task
			options: {
				csslintrc: '.csslintrc', // read .csslintrc, filename is given
			},
			all: {
				src: watchFiles.clientCSS // only client side css is mentioned for linting
			}
		},
		uglify: {
			production: {      // only in production
				options: {
					mangle: false 
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js' 
                                        // uglify the application.js into min file; we can pass array [ a.js, b.js, c.js ] to minify
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
                                        // applicationCSSFiles is assigned value as below
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js', // run server.js upon changing server side files
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS) // watch only js, views files
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
                ngAnnotate: {
                    production: {
                        files: {
                            'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
                            // applicationJavaScriptFiles is assigned value as below
                        }
                    }
                },
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'], // run node-inspector also in debug mode
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test' // define test as test environment
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	}); // end of grunt.initConfig
        
        // earlier we used to load tasks using grunt.loadNpmTasks('grunt-shell'); thus specifying each name
        // but now load-grunt-tasks reads package.json file and loads auto
	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config'); // load config files which loads env/config files which gives us
                // assets.-- files

		grunt.config.set('applicationJavaScriptFiles', config.assets.js); // variables used in <%= applicationJavaScriptFiles %> in above rule
                
		grunt.config.set('applicationCSSFiles', config.assets.css);
                // config.assets.css, config.assets.js got from loading config/
	});

        
	// Default task(s).
        // grunt.task.registerTask(taskName, taskList); this taskname was used above
        
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};

// how to run these tasks? do we need command line
// refer: http://gruntjs.com/api/grunt.task