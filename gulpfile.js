import gulp from 'gulp';
import clean from 'gulp-clean';
import gulpSass from 'gulp-sass';
import sassProcessor from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

const { src, dest, series, parallel } = gulp;
const sass = gulpSass(sassProcessor);

// Clean task
function cleanDist() {
  return src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
}

// CSS copy task
function copyCSS() {
  return src('src/scss/**/*.css')
    .pipe(dest('public/dist/css'));
}

function otherTask() {
  console.log("Executing other task parallely");
  return Promise.resolve();
}

// Export tasks
export const build = series(
  cleanDist, 
  parallel(copyCSS, otherTask)
);


// SCSS compilation task
export function compileSass() {
  return src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}

// Watch SCSS files for changes
export function watch() {
  watch('src/scss/**/*.scss', compileScss);
}
