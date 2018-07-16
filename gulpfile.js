const gulp = require('gulp');
const browserSync = require('browser-sync');

function getTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

getTask('sass', './tasks/sass', {
    src: 'app/scss/**/*.scss'
});

getTask('del:vendor', './tasks/clean', {
    src: './app/js/vendor.js'
});

getTask('buildVendorJS', './tasks/build-vendor', {
    srcFrom: '../app/vendor-entries/vendor.js'
});

getTask('scripts', './tasks/build-scripts', {
    src: 'app/lib/**/*.js'
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('app/lib/**/*.js', gulp.series('scripts'));
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
});

getTask('browserSync', './tasks/browser-sync');

getTask('minifyCSS', './tasks/minify-css', {
    src: './app/css/*.css'
});

getTask('del:dist', './tasks/clean', {
    src: './dist'
});

getTask('copy', './tasks/copy', {
    src: [
        './app/*.html',
        './app/fonts/**/*.*',
        './app/images/**/*.*'
    ]
});

getTask('minifyJS', './tasks/minify-js', {
    src: './app/js/**/*.js'
});

gulp.task('default', gulp.series('sass', 'scripts', 'del:vendor', 'buildVendorJS', gulp.parallel('browserSync', 'watch')));
gulp.task('dist', gulp.series('del:dist', 'minifyCSS', 'minifyJS', 'copy'));
