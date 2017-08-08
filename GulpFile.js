const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const rename      = require('gulp-rename');
// sass
const sass        = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// js
const pump = require('pump');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babili = require("gulp-babili");

// images
const imagemin = require('gulp-imagemin');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        open: false
    });

    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("src/javascript/*.js", browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
     gulp.src("src/scss/*.scss")
         .pipe(sass({
           includePaths: [
            './node_modules/tachyons-sass/'
         ]
       }))
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

// build tasks

gulp.task('image-build', function() {
        gulp.src(['images/*.svg', 'images/*.jpg'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('sass-build', function() {
     gulp.src("src/scss/*.scss")
         .pipe(sass({
           includePaths: [
            './node_modules/tachyons-sass/'
         ]
       }))
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js-build', function () {
  // pump helps locate errors better than `pipe`
  pump([
    gulp.src('src/javascript/*.js'),
    babili(),
    concat('app.min.js'),
    gulp.dest('dist/js')
  ])
});

gulp.task('default', ['serve']);
gulp.task('build', ['js-build', 'image-build', 'sass-build']);
