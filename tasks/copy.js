const gulp = require('gulp');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, { base: 'app' })
            .pipe(gulp.dest('dist'))
    }
};