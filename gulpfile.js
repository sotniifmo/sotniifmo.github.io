const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const recompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const bs = require('browser-sync');

function browserSync() {
    bs.init({
        server: {
            baseDir: 'build/',
            online: true
        },
        host: '127.0.0.1',
        port: '3009',
    })
}

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
        .pipe(gulp.dest('build/css'))
        .pipe(bs.stream());
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
        .pipe(gulp.dest('build/js'))
        .pipe(bs.stream());
}

function html() {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'));
}

function fonts() {
    return gulp.src('fonts/**')
        .pipe(gulp.dest('build/fonts'));
}

function images() {
    return gulp.src('images/**/*.+(png|jpg|jpeg|webp|avif|gif|svg)')
        .pipe(plumber())
        .pipe(changed('build/image'))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
        }, [
            recompress({
                loops: 6,
                min: 50,
                max: 90,
                quality: 'high',
                use: [pngquant({
                    quality: [0.8, 1],
                    strip: true,
                    speed: 1
                })],
            }),
            imagemin.gifsicle(),
            imagemin.optipng()
        ], ), )
        .pipe(gulp.dest('build/images'))
        .pipe(bs.stream());
}

function watch() {
    gulp.watch('*.html', html);
    gulp.watch('images/**/*.+(png|jpg|jpeg|webp|avif|gif)', images);
    gulp.watch(cssFiles, minifyStyles);
    gulp.watch(jsFiles, minifyScripts);
}

gulp.task('html', html);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('minifyStyles', minifyStyles);
gulp.task('minifyScripts', minifyScripts);
gulp.task('watch', watch);
gulp.task('browserSync', browserSync);

gulp.task('build', gulp.series('fonts', 'html', 'images', gulp.parallel('minifyStyles', 'minifyScripts')));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'browserSync')));
