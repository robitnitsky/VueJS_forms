const browserSync = require('browser-sync');

module.exports = function () {
    return function () {
        return browserSync({
            server: {
                baseDir: 'app'
            },
        });
    }
};