/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GRUNT
 * The grunt wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/

module.exports = function (grunt) {

  var path = require('path'),
      argv = require('minimist')(process.argv.slice(2));

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');

  /******************************************************
   * PATTERN LAB CONFIGURATION
  ******************************************************/

  //read all paths from our namespaced config file
  var config = require('./patternlab-config.json'),
    pl = require('patternlab-node')(config);

  function paths() {
    return config.paths;
  }

  function getConfiguredCleanOption() {
    return config.cleanPublic;
  }

  grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {

    if (arguments.length === 0) {
      pl.build(function(){}, getConfiguredCleanOption());
    }

    if (arg && arg === 'version') {
      pl.version();
    }

    if (arg && arg === "patternsonly") {
      pl.patternsonly(function(){},getConfiguredCleanOption());
    }

    if (arg && arg === "help") {
      pl.help();
    }

    if (arg && arg === "liststarterkits") {
      pl.liststarterkits();
    }

    if (arg && arg === "loadstarterkit") {
      pl.loadstarterkit(argv.kit, argv.clean);
    }

    if (arg && (arg !== "version" && arg !== "patternsonly" && arg !== "help" && arg !== "liststarterkits" && arg !== "loadstarterkit")) {
      pl.help();
    }
  });

  grunt.initConfig({

    //
    // Sass
    //

    sass: {
      dist: {
        options: {
          style: 'expanded', 
          sourcemap: 'inline'
        },
        files: {
          './public/assets/css/pattern-scaffolding.css': './source/assets/css/scss/pattern-scaffolding.scss', 
          './public/assets/css/style.css': './source/assets/css/scss/style.scss'
        }
      }
    }, 

    //
    // Autoprefix (add prefixes to CSS properties/values)
    //

    // https://github.com/browserslist/browserslist#queries

    autoprefixer: {
      options: {
        browsers: ['ie 10', 'ie 11', 'edge >10', 'chrome >50', 'firefox >50', 'opera >50', 'safari >9'], 
        map: true
      },
      target: {
        files: {
          './public/assets/css/pattern-scaffolding.css': ['./public/assets/css/pattern-scaffolding.css'], 
          './public/assets/css/style.css': ['./public/assets/css/style.css']
        }
      }
    },

    //
    // CSS min
    //

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './public/assets/css/pattern-scaffolding.min.css': ['./public/assets/css/pattern-scaffolding.css'], 
          './public/assets/css/style.min.css': ['./public/assets/css/style.css']
        }
      }
    },

    //
    // Concatenate JS
    //

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        // src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
        // src: ['source/js/**/*.js', '!source/js/libraries/**/*.js', '!source/js/polyfills/**/*.js', '!source/js/**/_*.js'],
        src: ['source/assets/js/functions/**/*.js'],
        dest: 'public/assets/js/scripts.js',
      },
    },

    //
    // Minify JS
    //

    uglify: {
      scripts: {
        options: {
          // beautify: true
        },
        files: {
          'public/assets/js/scripts.min.js': ['public/js/scripts.js']
        }
      }
    }, 

    //
    // Copy
    //

    copy: {

      // css
      css: {
        files: [
          {
            expand: true, 
            cwd: path.resolve(paths().source.css), 
            src: '**/*.css', 
            dest: path.resolve(paths().public.css) 
          }
        ]
      },

      // javascript
      js: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().source.js), 
            src: '**/*.js', 
            dest: path.resolve(paths().public.js) 
          },
          { 
            expand: true, 
            cwd: path.resolve(paths().source.js), 
            src: '**/*.js.map', 
            dest: path.resolve(paths().public.js) 
          }
        ]
      }, 

      // images
      images: {
        files: [
          {
            expand: true, 
            cwd: path.resolve(paths().source.images), 
            src: [
              '*', 
              '!*.psd',
              '!*.ai'
            ], 
            dest: path.resolve(paths().public.images) 
          }
        ]
      }, 

      // fonts
      fonts: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().source.fonts), 
            src: '**/*', 
            dest: path.resolve(paths().public.fonts) 
          }
        ]
      }, 

      // text
      text: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().source.text), 
            src: '**/*', 
            dest: path.resolve(paths().public.text) 
          }
        ]
      }, 

      // json
      json: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().source.json), 
            src: '**/*', 
            dest: path.resolve(paths().public.json) 
          }
        ]
      }, 

      // favicon
      favicon: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().source.root), 
            src: 'favicon.ico', 
            dest: path.resolve(paths().public.root) 
          }
        ]
      }, 

      // styleguide -- Pattern Lab UI
      styleguide: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().source.styleguide), 
            src: ['*', '**'], 
            dest: path.resolve(paths().public.root) 
          },
          { 
            expand: true, 
            flatten: true, 
            cwd: path.resolve(paths().source.styleguide, 'styleguide', 'css', 'custom'), src: '*.css)', 
            dest: path.resolve(paths().public.styleguide, 'css') 
          }
        ]
      }, 

      // copy all static files to "prodReadyAssets" directory -- css, javascript, images, fonts, json, text
      prodReadyAssets: {
        files: [
          { 
            expand: true, 
            cwd: path.resolve(paths().public.css),
            src: [
              '**/*.css'
            ], 
            dest: path.resolve(paths().prodReadyAssets.css) 
          },
          { 
            expand: true, 
            cwd: path.resolve(paths().public.js),
            src: [
              '**/*', 
              '!**/_*.js'
            ], 
            dest: path.resolve(paths().prodReadyAssets.js) 
          },
          { 
            expand: true, 
            cwd: path.resolve(paths().public.images),
            src: [
              '*', 
              '!*.psd',
              '!*.ai'
            ], 
            dest: path.resolve(paths().prodReadyAssets.images) 
          }, 
          { 
            expand: true, 
            cwd: path.resolve(paths().public.fonts),
            src: [
              '**/*'
            ], 
            dest: path.resolve(paths().prodReadyAssets.fonts) 
          },
          { 
            expand: true, 
            cwd: path.resolve(paths().public.json),
            src: [
              '**/*'
            ], 
            dest: path.resolve(paths().prodReadyAssets.json) 
          }, 
          { 
            expand: true, 
            cwd: path.resolve(paths().public.text),
            src: [
              '**/*.txt'
            ], 
            dest: path.resolve(paths().prodReadyAssets.text) 
          }
        ]
      }

    },

    compress: {
      all_assets: {
        options: {
          archive: 'prod-ready-assets/prod-ready-assets.zip'
        },
        files: [
          {
            src: [
              'public/assets/css/**/*',
              'public/assets/text/**/*',
              'public/assets/fonts/**/*',
              'public/assets/js/**/*',
              'public/assets/json/**/*',
              'public/assets/img/**/*',
              '!public/assets/js/**/_*.*',
              '!public/assets/js/pattern-lab-only',
              '!public/assets/js/pattern-lab-only.*',
              '!public/assets/js/pattern-lab-only/*'
            ],
            dest: 'prod-ready-assets/'
          }
        ]
      }
    },

    /*
     * watch and server
     */
    watch: {
      all: {
        files: [
          path.resolve(paths().source.css + '**/*.css'),
          path.resolve(paths().source.styleguide + 'css/*.css'),
          path.resolve(paths().source.patterns + '**/*'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/*.js'),
          path.resolve(paths().source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    browserSync: {
      dev: {
        options: {
          server:  path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [
            {
              module: 'bs-html-injector',
              options: {
                files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
              }
            }
          ],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    }

  });

  /*
   * compound tasks
   */

  // pattern lab tasks
  grunt.registerTask('default', ['patternlab', 'css', 'js', 'copy', 'compress']);
  grunt.registerTask('patternlab:build', ['patternlab', 'copy']);
  grunt.registerTask('patternlab:watch', ['patternlab', 'copy', 'watch:all']);
  grunt.registerTask('patternlab:serve', ['patternlab', 'copy', 'css', 'js', 'browserSync', 'watch:all']);

  // custom tasks
  grunt.registerTask('pl', ['patternlab']);
  grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin', 'copy:css']); // compile and minify css then copy files
  grunt.registerTask('js', ['copy:js', 'concat', 'uglify']);                 // copy js then concatenate and minify files
  grunt.registerTask('pl_css', ['pl', 'css']);
  grunt.registerTask('prodReadyAssets', ['copy:prodReadyAssets']);

};
