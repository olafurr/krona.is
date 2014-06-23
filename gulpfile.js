var gulp = require('gulp');

var watch   = require('gulp-watch'),
		concat  = require('gulp-concat'),
		less    = require('gulp-less'),
		cssmin  = require('gulp-cssmin'),
		uglify  = require('gulp-uglify'),
		nodemon = require('gulp-nodemon'),
		inject 	= require('gulp-inject'),
		jshint 	= require('gulp-jshint'),
		rename 	= require('gulp-rename'),
		cssmin 	= require('gulp-cssmin'),
		exclude = require('gulp-ignore').exclude;


var dir = {
	scripts: ['app/public/js/*.js', 'app/public/js/**/*.js'],
	less: 'app/public/less/*.less',
	styles: 'app/public/css/*.css'
};

var dest = {
	scripts: 'app/public_build/js',
	styles: 'app/public_build/css'
};

gulp.task('nodemon', function () {
	nodemon({
		script: 'index.js',
		ext: 'jade js'
	})
	.on('change', ['uglify'])
	.on('restart', function () {
		console.log('Server restarted...');
	});	
});


gulp.task('jshint', function () {
	gulp.src(dir.scripts)
		.pipe(jshint());
});

gulp.task('uglify', function () {
	return gulp.src(dir.scripts)
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(dest.scripts));
});

gulp.task('less', function () {
	return gulp.src(dir.less)
	.pipe(less())
	.pipe(exclude('app/public/less/variables.less'))
	.pipe(gulp.dest('app/public/css'));
});

gulp.task('cssmin', function () {
	return gulp.src(dir.styles)
	.pipe(cssmin())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(dest.styles))
});

gulp.task('watch', function () {
	gulp.watch(dir.styles, ['cssmin']);
	gulp.watch(dir.less, ['less']);
});

gulp.task('default', ['jshint', 'uglify', 'less', 'watch', 'nodemon']);
gulp.task('build', ['jshint', 'uglify', 'less']);