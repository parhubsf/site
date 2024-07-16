
module.exports = function(grunt) {
  'use strict';

  // configuração do projeto
  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),
    theme: 'assets',
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          noCache: true
        },
        files: {
          '<%= theme %>/css/theme.min.css' : '<%= theme %>/css/scss/theme.scss'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          '<%= theme %>/js/theme.min.js'   :  '<%= theme %>/js/modules/**/*'
        }
      }
    },
    watch: {
      css: {
        files: ['<%= theme %>/css/scss/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['<%= theme %>/js/modules/*.js'],
        tasks: ['uglify']
      }
    }
  };

  grunt.initConfig(gruntConfig);

  // carregando plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tarefas
  grunt.registerTask('default', ['watch']);
};
