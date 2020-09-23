const gulp = require('gulp');

// Tslint configuration
const tslint = require("gulp-tslint");
const log = require('fancy-log');
const colors = require('ansi-colors');
const through = require('through');
const argv = require('yargs').argv;
const plumber = require('gulp-plumber');
const nativeTslint = require('tslint');

var CURRENT_TOTAL_ERRORS = argv.errorsAllowed;
var totalLintErrors = 0,
  reportLimit = argv.reportLimit || 10;


var onError = function (err) {
  log(err);
  this.emit('end');
};

gulp.task("tslint", () => {
  return gulp.src("src/**/*.ts")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(tslint({
      formatter: "stylish",
      // configuration: "tslint.json"
      program: nativeTslint.Linter.createProgram('./tsconfig.json')
    }))
    .pipe(tslint.report({
      allowWarnings: true,
      summarizeFailureOutput: true,
      reportLimit: reportLimit,
      emitError: true
    }))
    .pipe((() => {
      var hasError = false;
      return through(function (file) {
        totalLintErrors += file.tslint.errorCount;
        if (file.tslint.failureCount !== 0) {
          hasError = true;
        }
      }, function () {
        if (hasError && totalLintErrors > CURRENT_TOTAL_ERRORS) {
          log(
            `[${colors.cyan('gulp-tslint')}]`,
            colors.red(`Total Errors: ${totalLintErrors}`));

          log(
            `[${colors.cyan('gulp-tslint')}]`,
            colors.yellow(`Current Allowed Limit is: ${CURRENT_TOTAL_ERRORS}`));
          this.emit('error', new Error('gulp-tslint', 'Failed Tslint.'));
          process.exit(1);
        } else {
          this.emit('end');
        }
      });
    })());
});

