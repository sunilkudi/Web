var gulp   = require('gulp');
  var deploy = require('gulp-gh-pages');

  gulp.task('deploy', function () {
    return gulp.src("./prod/**/*")
      .pipe(deploy({ 
        remoteUrl: "https://github.com/sunilkudi/Web.git",
        branch: "master"
      }))
  });
