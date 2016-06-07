'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['src/*.js', 'Gruntfile.js'],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['src/*.js']
    },
    less: {
      options: {
        paths: ['src/', 'node_modules/videojs-hola-skin/src/css/']
      },
      all: {
        files: [
          {nonull: true, dest: 'dist/videojs-settings.css', src: ['src/*.less']}
        ]
      }
    },
    concat: {
      dist: {
        src: ['node_modules/clipboard/dist/clipboard.js', 'src/*.js'],
        dest: 'dist/videojs-settings.js'
      }
    },
    uglify : {
      all : {
        files: {
          'dist/videojs-settings.min.js' : [
            'dist/videojs-settings.js'
          ]
        }
      }
    }
  });

  // Load Grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint', 'less', 'concat', 'uglify']);

};
