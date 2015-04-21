/*
 *  Task runnning via Gulp
 *
 */

'use strict';

/*
 * Dependencies
 *
 */
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  runSequence = require('run-sequence'),
  mocha = require('gulp-mocha'),
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint'),
  exit = require('gulp-exit'),
  fs = require('fs'),
  ursa = require('ursa'),
  argv = require('yargs').argv;



// Encrypt files
gulp.task('encrypt', function (callback) { 
    var input_file = typeof(argv.in) !== 'undefined' && argv.in ? argv.in : false;
    var output_file = typeof(argv.out) !== 'undefined' && argv.out ? argv.out : false;
    if(input_file && output_file){
      var input_data = fs.readFileSync(input_file, 'utf8').trim();
      var public_key = ursa.createPublicKey(fs.readFileSync('devops/keys/pubkey.pem'));
      var encrypted_data = public_key.encrypt(input_data, 'utf8', 'base64');
      fs.writeFileSync(output_file, encrypted_data);
    } else {
      console.log('Missing input or output file parameters');
    }
     
});


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
  console.log('Please specify a gulp task');
});