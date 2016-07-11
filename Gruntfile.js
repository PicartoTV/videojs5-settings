'use strict';

module.exports = function(grunt) {
  let pkg = grunt.file.readJSON('package.json');
  let version = pkg.version;

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
    },
    shell: {
      github: {
        command: [
          'git checkout -b tag-v'+version,
          'grunt build',
          'git add -f dist',
          'git commit -m "add dist v'+version+'"',
          'git tag -a v'+version+' -m "v'+version+'"',
          'git checkout master',
          'git branch -D tag-v'+version,
          'git push --tags origin'
        ].join('&&')
      }
    }
  });

  // Load Grunt tasks.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['jshint', 'less', 'concat', 'uglify']);
  grunt.registerTask('release', ['build', 'shell:github']);
  // Default task.
  grunt.registerTask('default', ['build']);

};
