const gulp = require('gulp');
const uglify = require('gulp-uglify');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, { base: 'app' })
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    }
};