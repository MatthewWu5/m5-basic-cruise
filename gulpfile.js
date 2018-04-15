var gulp = require('gulp'), minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'), uglify = require('gulp-uglify'),
    rename = require('gulp-rename'), del = require('del'), 
    rev = require('gulp-rev'), revCollector = require('gulp-rev-collector');

// gulp.task('minifycss', function () {
//     gulp.src('./css/*.css')
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(minifycss())
//         .pipe(gulp.dest('dist/css'));
// });
// gulp.task('minifyjs', function () {
//     gulp.src('./js/*.js')
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

gulp.task('minifycss', function () {
    gulp.src('./css/*.css')
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
});

gulp.task('minifyjs', function () {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
});

gulp.task('rev', function () {
    return gulp.src(['dist/rev/**/*.json', './index.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js'
                // 'cdn/': function(manifest_value) {
                //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                // }
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('move-files', function () {
    // gulp.src('./index.html').pipe(gulp.dest('dist'));
    gulp.src('./data/cruise.json').pipe(gulp.dest('dist/data'));
});

gulp.task('package', function () {
    del.sync(['dist/css', 'dist/js']);
    gulp.start('minifycss', 'minifyjs', 'move-files');
    gulp.start('rev');
});