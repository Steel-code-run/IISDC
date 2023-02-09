const gulp = require('gulp');
const ts = require('gulp-typescript');
const {execSync} = require("child_process");

const tsProject = ts.createProject('tsconfig.json');

function clear(cb){
    try {
        execSync("rd -r built/packages")
    }
    catch (e) {}
    cb();
}

function compileTS(cb){
    gulp.src(['packages/**/*.ts', '!**/node_modules/**'])
        .pipe(tsProject())
        .pipe(gulp.dest('built/packages'));
    cb()
}

function copyOtherJSFiles(cb){
    gulp.src(['packages/**/*.js', '!**/node_modules/**'])

        .pipe(gulp.dest('built/packages'));
    cb()
}

function copyPackageJson(cb){
    gulp.src(['packages/**/package.json', '!**/node_modules/**'])
        .pipe(gulp.dest('built/packages'));
    cb()
}

gulp.task("buildPackages",gulp.series(
    clear,
    copyOtherJSFiles,
    copyPackageJson,
    compileTS
))
