const gulp = require('gulp');
const concat = require('gulp-concat');
const filesExist = require('files-exist');

module.exports = function (options) {
    return function (cb) {
        let vendorJS = require(options.srcFrom);
        console.log(vendorJS);
        if (vendorJS.length > 0) {
            return gulp.src(filesExist(vendorJS))
                .pipe(concat('vendor.js'))
                .pipe(gulp.dest('app/js'))
        } else {
            cb();
        }
    }
};