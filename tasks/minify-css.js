const gulp = require('gulp');
const stripCssComments = require('gulp-strip-css-comments');
const cleanCSS = require('gulp-clean-css');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, { base: 'app' })
            .pipe(stripCssComments({ preserve: false }))
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(gulp.dest('dist'));
    }
};