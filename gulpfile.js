var gulp        = require('gulp');
//var minifyCss   = require('gulp-minify-css');
//var coffee      = require('gulp-coffee');
//var sass        = require('gulp-sass');
//var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
//var reload      = browserSync.reload;

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: true // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync'/*, 'sass'*/], function() {
    //gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/*.css', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});