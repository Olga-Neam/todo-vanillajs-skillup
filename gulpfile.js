let gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),

  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),

  htmlReplace = require('gulp-html-replace'),
  htmlMin = require('gulp-htmlmin'),

  del = require('del'),

  livereload = require('gulp-livereload');

let config = {
  dist: 'dist/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  htmlin: 'src/*.html',
  scssin: 'src/scss/**/*.scss',
  cssout: 'dist/css/',
  jsout: 'dist/js/',
  htmlout: 'dist/',
  scssout: 'src/css/',
  cssoutname: 'styles.css',
  jsoutname: 'index.js',
  cssreplaceout: 'css/styles.css',
  jsreplaceout: 'js/index.js'
};

gulp.task('build-html', function() {
  return gulp.src(config.htmlin)
    .pipe(htmlReplace({
      'css': config.cssreplaceout,
      'js': config.jsreplaceout,
    }))
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(livereload());
});

gulp.task('build-js', function() {
  return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout))
    .pipe(livereload());
});

gulp.task('build-scss', function() {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions', '> 5%']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssout))
    .pipe(livereload());
});

gulp.task('build-css', function() {
  return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout))
    .pipe(livereload());
});


gulp.task('clean', function() {
  return del([config.dist]);
});

gulp.task('build', gulp.series(['clean', 'build-html', 'build-js', 'build-scss', 'build-css']));

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(config.htmlin, gulp.series('build-html'));
  gulp.watch(config.jsin, gulp.series('build-js'));
  gulp.watch(config.cssin, gulp.series('build-css'));
  gulp.watch(config.scssin, gulp.series('build-scss'));
});

gulp.task('default', gulp.series('build', 'watch'));