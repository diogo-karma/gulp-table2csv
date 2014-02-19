'use strict';

var gulp = require('gulp'),
	fs = require('fs'),
	jshint = require('gulp-jshint');

gulp.task('jshint', function () {

	var options = JSON.parse(fs.readFileSync('.jshintrc', 'utf8'));

	gulp.src('./*.js')
		.pipe(jshint(options))
		.pipe(jshint.reporter('default'));

});

// default task
gulp.task('default', function () {
	gulp.run('jshint');
	gulp.watch(['index.js'], function () {
		gulp.run('jshint');
	});
});

