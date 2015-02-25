/*
 *  Task runnning via Gulp
 *
 */

'use strict';

/*
 * Dependencies
 *
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var exit = require('gulp-exit');


// Lint the application code
gulp.task('tests-lint-application', function () {
  return gulp.src(
      [
        'app.js',
        'routes.js',
        'controllers/**/*.js',
        'models/**/*.js',
        'schema/**/*.js',
        'lib/**/*.js'
      ]
    )
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Lint the test code
gulp.task('tests-lint-test', function () {
  return gulp.src(['test/**/*.js'])
    .pipe($.jshint({
      expr: true
    }))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


// All linting
gulp.task('tests-lint', function (callback) {
  runSequence(
    'tests-lint-application',
    'tests-lint-test',
    callback);
});


// Run mocha unit tests
gulp.task('tests-unit', function () {
  return gulp.src(['test/unit/**/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      ui : 'bdd'
    })
    .on('error', process.exit.bind(process, 1))
  );
});

// Run mocha service and method level integration tests
gulp.task('tests-component', function () {
  return gulp.src(['test/component/**/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      ui : 'bdd'
    })
    .on('error', process.exit.bind(process, 1))
  );
});

// Run mocha service and method level integration tests
gulp.task('tests-integration', function () {
  return gulp.src(['test/integration/**/*.js', '!test/integration/_*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      ui : 'bdd'
    })
    .on('error', process.exit.bind(process, 1))
  );
});

// Kill the test process by piping to exit
gulp.task('tests-kill', function () {
  return gulp.src(['test/kill.js'], {read: false})
  .pipe(exit());
});


// Run all tests
gulp.task('tests-all', function (callback) {
  runSequence(
    'tests-lint',
    'tests-unit',
    'tests-component',
    'tests-integration',
    'tests-kill',  
    callback);
});

// Serve via nodemon, reboot and re-run all tasks when changes occur
gulp.task('watch', function () {
  nodemon({
    script: 'bin/www',
    ext: 'js',
    stdout: false
  })
  .on('start', ['default'])
  .on('restart', ['default'])
});

// Build defaults
gulp.task('default', function (callback) {
  runSequence(
    'tests-lint',
    'tests-unit',
    'tests-component',
    'tests-integration',
    callback);
});