const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: true
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
};