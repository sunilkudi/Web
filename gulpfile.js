/*******************************************************************************
 * Description:
 * 
 *   Gulp file to push changes to remote servers (eg: staging/production)
 *
 * Usage:
 * 
 *   gulp deploy --target
 *
 * Examples:
 * 
 *   gulp deploy --production   // push to production
 *   gulp deploy --staging      // push to staging
 *   
 ******************************************************************************/
var gulp   = require('gulp');

// gulp-util - https://www.npmjs.com/package/gulp-util
var gutil = require('gulp-util');

// Minimist - https://www.npmjs.com/package/minimist
var argv  = require('minimist')(process.argv);

// gulp-rsync - https://www.npmjs.com/package/gulp-rsync
var rsync = require('gulp-rsync');

// gulp-prompt - https://www.npmjs.com/package/gulp-prompt
var prompt = require('gulp-prompt');

// gulp-if - https://www.npmjs.com/package/gulp-if
var gulpif = require('gulp-if');

gulp.task('deploy', function() {
  
  // Dirs and Files to sync
  rsyncPaths = [path.dist, 'lang', 'lib', 'templates', './*.php', './style.css' ];
  
  // Default options for rsync
  rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: [],
  };
  
  // Staging
  if (argv.staging) {
    
    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go
    
  // Production
  } else if (argv.production) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go
    
  
  // Missing/Invalid Target  
  } else {
    throwError('deploy', gutil.colors.red('Missing or invalid target'));
  }
  

  // Use gulp-rsync to sync the files 
  return gulp.src(rsyncPaths)
  .pipe(gulpif(
      argv.production, 
      prompt.confirm({
        message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
        default: false
      })
  ))
  .pipe(rsync(rsyncConf));

});


function throwError(taskName, msg) {
  throw new gutil.PluginError({
      plugin: taskName,
      message: msg
    });
}
