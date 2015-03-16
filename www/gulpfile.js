var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    requirejs = require('gulp-requirejs');

gulp.task('requirejs-optimizer', function () {
    requirejs({
            baseUrl: 'scripts',
            name: 'main',
            out: 'main.min.js',
        })
        .pipe(uglify())
        .pipe(gulp.dest('scripts/dist'));
});

gulp.task('3rd-party-concat', function () {
     gulp.src(['scripts/libs/prefixfree.min.js',
             'scripts/libs/jquery.min.js',
             'scripts/libs/knockout.min.js',
             'scripts/libs/koExternalTemplateEngine_all.min.js', 
             'scripts/libs/require.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('scripts/dist'));
});

gulp.task('scripts', ['requirejs-optimizer', '3rd-party-concat']);

gulp.task('watch', function() {
  gulp.watch('scripts', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);