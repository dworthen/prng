var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('build', function() {
  gulp.src(['require.js', 'support/js/Mash.js', 'support/js/!(Mash)*.js', 'index.js'])
    .pipe(replace('require', '__require__'))
    .pipe(sourcemaps.init())
    .pipe(concat('prng.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('prng.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['build']);