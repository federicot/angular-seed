module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        shell: {
            options: {
                stdout: true
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
            npm_install: {
                command: 'npm install'
            },
            bower_install: {
                command: 'node ./node_modules/bower/bin/bower install --allow-root'
            }
        },

        uglify: {
            options: {
                mangle: false,
                wrap: false,
                compress: false
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, cwd: 'src', src: ['images/**'], dest: 'build/'},
                ]
            },
            html: {
                files: [
                    {src: 'src/index.html', dest: 'build/index.html'},
                    {expand: true, cwd: 'src', src: ['partials/**'], dest: 'build/'}
                ]
            }
        },

        htmlmin: {
            index: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {src: 'build/index.html', dest: 'build/index.html'}
                ]
            },
            partials: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {expand: true, cwd: 'build/partials', src: ['**/*.html'], dest: 'build/partials'}
                ]
            }
        },

        watch: {
            css: {
                files: 'src/css/**',
                options: {
                    livereload: true,
                },
            },
            javascript: {
                files: 'src/js/**',
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['src/index.html', 'src/partials/**'],
                options: {
                    livereload: true,
                },
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/js/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: './test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit_auto: {
                configFile: './test/karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            },
            unit_coverage: {
                configFile: './test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true,
                reporters: ['progress', 'coverage'],
                preprocessors: {
                    'src/js/*.js': ['coverage']
                },
                coverageReporter: {
                    type : 'html',
                    dir : 'coverage/'
                }
            },
        },
        protractor: {
            options: {
                keepAlive: true,
                configFile: "./test/protractor.conf.js"
            },
            singlerun: {},
            auto: {
                keepAlive: true,
                options: {
                    args: {
                        seleniumPort: 4444
                    }
                }
            }
        },
        open: {
            devserver: {
                path: 'http://localhost:8000'
            },
            coverage: {
                path: 'http://localhost:5555'
            }
        },
        connect: {
            options: {
                base: 'src/',
                hostname: '*'
            },
            webserver: {
                options: {
                    base: 'build/',
                    port: 8001,
                    keepalive: true
                }
            },
            devserver: {
                options: {
                    port: 8000,
                    keepalive: false
                }
            },
            testserver: {
                options: {
                    port: 9999
                }
            },
            coverage: {
                options: {
                    base: 'coverage/',
                    port: 5555,
                    keepalive: true
                }
            }
        },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'build'
            }
        },

        usemin: {
            html: 'build/index.html',
            options: {
                dest: 'build'
            }
        },

        inline_angular_templates: {
            dist: {
                options: {
                    base: 'build',
                    prefix: '',
                    selector: 'body',
                    method: 'append'
                },
                files: {
                    'build/index.html': ['build/partials/**/*.html']
                }
            }
        }
    });

    // Install
    grunt.registerTask('install', ['shell:npm_install', 'shell:bower_install', 'shell:protractor_install']);
    grunt.registerTask('update', ['shell:npm_install', 'shell:bower_install', 'shell:protractor_install']);

    // Tests
    grunt.registerTask('test', ['jshint','test:unit', 'test:e2e']);
    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('test:e2e', ['connect:testserver','protractor:singlerun']);

    // Coverage
    grunt.registerTask('coverage', ['karma:unit_coverage','open:coverage','connect:coverage']);

    // Build
    grunt.registerTask('build', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'copy:main', 'copy:html', 'usemin', 'htmlmin:partials', 'inline_angular_templates', 'htmlmin:index']);

    // Server
    grunt.registerTask('devserver', ['connect:devserver', 'open:devserver', 'watch']);
    grunt.registerTask('webserver', ['connect:webserver']);

};
