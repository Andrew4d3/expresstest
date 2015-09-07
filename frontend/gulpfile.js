//////////////////////
// Convention names //
//////////////////////
var development = 'DEV',        // Development's tag name
    distribution = 'DIST',      // Distribution's tag name
    lessLang = 'less',          // Less language
    sassLang = 'sass';          // Sass language

///////////////////////////
// Environment variables //
///////////////////////////
var ENV = development,          // Environment type (development | distribution)
    PREPROCESSOR = lessLang,    // Prepocessor type (lessLang | sassLang)
    PORT = 9090;                // Port's number

function isDevelopment() { return ENV === development; }
function isDistribution() { return ENV === distribution; }
function isLess() { return PREPROCESSOR === lessLang; }
function isSass() { return PREPROCESSOR === sassLang; }

////////////////////
// Gulp's plugins //
////////////////////
var gulp = require('gulp');
// Loading all the pluigins in package.json
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'browser-sync', 'wiredep']
});

/////////////////////////////////////////////////////
// Connects with a local server (development mode) //
/////////////////////////////////////////////////////
gulp.task('connect', function() {
  var routes = {
    // Should be '/bower_components': '../bower_components'
    // Waiting for https://github.com/shakyShane/browser-sync/issues/308
    '/bower_components': 'bower_components'
  };

  $.browserSync({
    port: PORT,
    server: {
      baseDir: ['src', 'dist'],
      routes: routes
    },
  });
});

//////////////
// Watchers //
//////////////
gulp.task('watch', function() {
  gulp.watch(['src/vendors/**/*.js'], ['customVendors']);
  gulp.watch(['src/app/**/*.js'], ['app']);
  gulp.watch(['src/assets/**/*'], ['assets']);
  gulp.watch(['src/app/**/*.html', 'src/index.html'], $.browserSync.reload);
  gulp.watch('bower.json', ['bower-install', 'bower']);

  if (isLess())
    gulp.watch(['src/styles/less/**/*.less'], ['less']);
  else
    gulp.watch(['src/styles/sass/**/*.scss'], ['sass']);
});

////////////////////////////////////////////////////////////////
// Compiles (uglifies) all 3rd party libraries in src/vendors //
////////////////////////////////////////////////////////////////
gulp.task('customVendors', function() {
  return gulp.src('src/vendors/**/*.js')
    .pipe($.plumber())
    .pipe($.newer('dist/js'))
    .pipe($.concat('custom-vendors.js', { newLine: ';' }))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.if(isDistribution(), $.rev()))
    .pipe(gulp.dest('dist/js'))
    .pipe($.if(isDistribution(), $.rev.manifest('custom-vendors.json')))
    .pipe($.if(isDistribution(), gulp.dest('dist/revisions/')))
    .pipe($.size({ title: 'customVendors', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

////////////////////////
// Creating revisions //
////////////////////////
gulp.task('revision', function() {
  return gulp.src(['dist/revisions/**.json', 'dist/index.html'])
    .pipe($.revCollector())
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'revision', showFiles: true }));
});

/////////////////////////////////////////////////////////////
// Compiles, concats, annotates and uglifies the whole app //
/////////////////////////////////////////////////////////////
gulp.task('app', function() {
  return gulp.src('src/app/**/*.js')
    .pipe($.plumber())
    // .pipe($.newer('dist/js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(isDevelopment(), $.sourcemaps.init()))
    .pipe($.concat('app.js', { newLine: ';' }))
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.if(isDevelopment(), $.sourcemaps.write('../maps', { includeContent: false, sourceRoot: '/app' })))
    .pipe($.if(isDistribution(), $.rev()))
    .pipe(gulp.dest('dist/js'))
    .pipe($.if(isDistribution(), $.rev.manifest('app.json')))
    .pipe($.if(isDistribution(), gulp.dest('dist/revisions/')))
    .pipe($.size({ title: 'app', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

/////////////////////
// Clean all files //
/////////////////////
gulp.task('clean', function () {
  return gulp.src(['dist/js/*.js', 'dist/maps/*.js.map', 'dist/css/*.css'], { read: false })
    .pipe($.clean());
});

//////////////////////////////////////////////////////////
// Compiles, auto-prefixes and minifies all .less files //
//////////////////////////////////////////////////////////
gulp.task('less', function() {
  // NOTE: if I return the stream, when there is an error, everything breaks
  gulp.src('src/styles/less/{custom-vendors,style}.less')
    .pipe($.plumber())
    // .pipe($.newer('dist/css'))
    .pipe($.less())
    .pipe($.autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe($.if(isDevelopment(), $.csso()))
    .pipe($.if(isDistribution(), $.rev()))
    .pipe(gulp.dest('dist/css'))
    .pipe($.if(isDistribution(), $.rev.manifest('less.json')))
    .pipe($.if(isDistribution(), gulp.dest('dist/revisions/')))
    .pipe($.size({ title: 'less', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

//////////////////////////////////////////////////////////
// Compiles, auto-prefixes and minifies all .scss files //
//////////////////////////////////////////////////////////
gulp.task('sass', function() {
  return gulp.src('src/styles/sass/{custom-vendors,style}.scss')
    .pipe($.plumber())
    // .pipe($.newer('dist/css'))
    .pipe($.rubySass({
      compass: true,
      lineNumbers: isDevelopment(),
      precision: 6,
    }))
    .pipe($.autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe($.if(isDevelopment(), $.csso()))
    .pipe($.if(isDistribution(), $.rev()))
    .pipe(gulp.dest('dist/css'))
    .pipe($.if(isDistribution(), $.rev.manifest('less.json')))
    .pipe($.if(isDistribution(), gulp.dest('dist/revisions/')))
    .pipe($.size({ title: 'sass', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

///////////////////////////////////////////////
// Just copies all assets in the dist folder //
///////////////////////////////////////////////
gulp.task('assets', function() {
  return gulp.src('src/assets/{images,fonts,icons,misc}/**/*')
    .pipe($.plumber())
    .pipe($.newer('dist/'))
    .pipe(gulp.dest('dist/'))
    .pipe($.size({ title: 'assets', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

///////////////////////////////////
// Put all bower fonts into dist //
///////////////////////////////////
gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,otf}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({ title: 'fonts', showFiles: true }));
});

////////////////////////////////////////////////////////////////////////////////////////
// Generates AngularJS modules, which pre-load your HTML code into the $templateCache //
// This way AngularJS doesn't need to request the actual HTML files anymore           //
////////////////////////////////////////////////////////////////////////////////////////
gulp.task('partials', function() {
  return gulp.src('src/app/**/*.html')
    .pipe($.htmlmin({ removeComments: true, conservativeCollapse: true, collapseWhitespace: true }))
    .pipe($.ngHtml2js({ moduleName: 'app', prefix: "app/" }))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.rev())
    .pipe(gulp.dest('dist/partials'))
    .pipe($.size({ title: 'partials', showFiles: true }));
});

/////////////////////////////////////////////////////
// Inject all partials (*.js) into dist/index.html //
/////////////////////////////////////////////////////
gulp.task('inject', function() {
  return gulp.src('dist/index.html')
    .pipe($.plumber())
    .pipe($.inject(gulp.src('dist/partials/**/*.js', { read: false }), {
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      relative: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe($.size({ title: 'inject', showFiles: true }));
});

//////////////////////////////
// Injects bower components //
//////////////////////////////
gulp.task('bower', function() {
  var wiredep = $.wiredep.stream;
  return gulp.src('src/index.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: [/bootstrap.css/],
    }))
    .pipe(gulp.dest('src'))
    .pipe($.size({ title: 'bower', showFiles: true }));
});

//////////////////////////////////////
// Changes and concats bower assets //
//////////////////////////////////////
gulp.task('useref', function() {
  var jsFilter = $.filter('**/*.js'),
      cssFilter = $.filter('**/*.css'),
      assets = $.useref.assets();

  return gulp.src('src/index.html')
    .pipe(assets)
    .pipe(jsFilter)
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'useref', showFiles: true }));
});

/////////////////////////////////
// Installing bower components //
/////////////////////////////////
gulp.task('bower-install', function() {
  return gulp.src(['bower.json'])
    .pipe($.install());
});

//////////////////////////////////////
// Build task (for production only) //
//////////////////////////////////////
gulp.task('build', function() {
  var temp = ENV;
  ENV = distribution;
  $.runSequence('clean', 'bower-install', 'bower', 'useref', 'partials', 'inject', 'customVendors', 'app', PREPROCESSOR, 'assets', 'fonts', 'revision', function() {
    ENV = temp;
  });
});

//////////////////////
// Build and serves //
//////////////////////
gulp.task('default', function() {
  $.runSequence('clean', 'bower-install', ['customVendors', 'app', PREPROCESSOR, 'assets', 'fonts', 'bower'], 'connect', 'watch');
});

