var gulp = require('gulp'), minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'), uglify = require('gulp-uglify'),
    rename = require('gulp-rename'), del = require('del');

gulp.task('minifycss', function () {
    gulp.src('./css/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css'));
});

gulp.task('minifyjs', function () {
    gulp.src('./js/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'));
});

gulp.task('move-files', function () {
    gulp.src('./index.html').pipe(gulp.dest('dest'));
    gulp.src('./data/cruise.json').pipe(gulp.dest('dest/data'));
});

gulp.task('package', function () {
    del.sync(['dest/css', 'dest/js']);
    gulp.start('minifycss', 'minifyjs', 'move-files');
});