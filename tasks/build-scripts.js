const gulp = require('gulp');
const concat = require('gulp-concat');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(concat('app.js'))
            .pipe(gulp.dest('app/js/'));
    }
};