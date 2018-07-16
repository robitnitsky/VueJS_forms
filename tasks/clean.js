const gulp = require('gulp');
const clean = require('gulp-clean');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, { read: false, allowEmpty: true })
            .pipe(clean());
    }
}