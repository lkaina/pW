module.exports = function(grunt) {

  var repoPath = '/Users/leig/Coding/prosperWorks/pW';
  var scriptsPath = '';
  var templatesPath = '';
  var cssPath = '';

  // configure the tasks
  grunt.initConfig({
    paths: {
      repo: repoPath,
      scripts: scriptsPath,
      templates: templatesPath,
      css: cssPath
    },

    concat: {
      options: {
        separator: '\n\n',
      },
      js: {
        src: ['app.module.js', 'components/**/*.module.js', 'app.*.js', 'components/**/*.js'],
        dest: 'build.js'
      },
      css: {
        src: ['app.css', 'components/**/*.css'],
        dest: 'build.css',
      }
    },

    watch: {
      scripts: {
        files: [ '!**/build.js', '!**/node_modules/**', '!**/bower_components/**', '!**/Gruntfile.js', '<%= paths.repo %>/**/*.js'],
        tasks: [ 'concat:js' ]
      },
      // templates: {
      //   files: [ '**/*.html', '!**/node_modules/**', '!**/bower_components/**'],
      //   tasks: [ ]
      // },
      // css: {
      //   files: [ '!**/build.css', '!**/node_modules/**', '!**/bower_components/**', '**/*.css'],
      //   tasks: [ 'concat:css' ]
      // },
      options: {
        nospawn: true,
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 4001,
          base: 'build',
          hostname: '*'
        }
      }
    }

  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // define the tasks

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'concat', 'connect', 'watch' ]
  );
};
