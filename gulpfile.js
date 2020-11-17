const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');

const cssFiles = [
    'node_modules/normalize.css/normalize.css',
    'node_modules/fullpage.js/dist/fullpage.min.css',
    'node_modules/wow.js/css/libs/animate.css',
    'css/style.css'
];

const jsFiles = [
    'node_modules/fullpage.js/dist/fullpage.min.js',
    'node_modules/wow.js/dist/wow.min.js',
    'js/script.js'
];

function minifyStyles() {
    return gulp.src(cssFiles)
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('css'));
}

function minifyScripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true,
            mangle: false,
            compress: false
        }))
        .pipe(gulp.dest('js'));
}

function watch() {
    gulp.watch(cssFiles, minifyStyles);
    gulp.watch(jsFiles, minifyScripts);
}

gulp.task('minifyStyles', minifyStyles);
gulp.task('minifyScripts', minifyScripts);
gulp.task('watch', watch);

gulp.task('build', gulp.parallel('minifyStyles', 'minifyScripts'));
gulp.task('dev', gulp.series('build', 'watch'));