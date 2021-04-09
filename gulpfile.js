const { src, dest, task, series, watch } = require("gulp");
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');


task('clean', () => {
    return src('dist/**/', {read: false})
        .pipe(clean());
});


task ('copy:scss',  () => {
    return src('src/styles/*.scss').pipe(dest('dist'))
});

task ('copy:img',  () => {
    return src('src/img/*.*').pipe(dest('dist/img'))
});

task ('copy:video',  () => {
    return src('src/video/*.mp4').pipe(dest('dist/video'))
});

task ('copy:html',  () => {
    return src('src/index.html').pipe(dest('dist')).pipe(reload({stream: true}));
});


const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
];

task ('styles',  () => {
    return src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
});

task('scripts', () => {
    return src('src/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

watch("./src/styles/**/*.scss", series("styles"));
watch("./src/*.html", series("copy:html"));
watch("./src/scripts/*.js", series("scripts"));
task ("default", series ("clean", "styles", "copy:scss", "copy:html",'copy:video','copy:img', 'scripts', "server"));
