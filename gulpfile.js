var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),	
	connect = require('gulp-connect');


var sassStyle = ['sass/main.scss'];

var sassSources = ['sass/*.scss'];


gulp.task('sass', function() {
    gulp.src(sassStyle)
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on('error', gutil.log))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch(sassSources,['sass']); 
});

gulp.task('connect', function() {
  connect.server({
  	port: 8888
  });
});
 
gulp.task('default', ['connect', 'sass', 'watch']);