const gulp = require('gulp');
const ts = require('gulp-typescript');
const {execSync} = require("child_process");

const tsProject = ts.createProject('tsconfig.json');

function clear(cb){
    try {
        execSync("rd -r built/backend")
    }
    catch (e) {}
    cb();
}

function compileTS (cb) {
    gulp.src(['backend/src/**/*.ts', '!**/node_modules/**'])
        .pipe(tsProject())
        .pipe(gulp.dest('built/backend/src'));
    cb()
}
function copyPackageJson(cb){
    gulp.src(['backend/package.json', '!**/node_modules/**'])
        .pipe(gulp.dest('built/backend'));
    cb()
}

function copySqlite(cb){
    gulp.src(['backend/sqlite/**/*.db', '!**/node_modules/**'])
        .pipe(gulp.dest('built/backend/sqlite'));
    cb()
}

function copyEnv(cb){
    gulp.src(['backend/.env.*', '!**/node_modules/**'])
        .pipe(gulp.dest('built/backend'));
    cb()
}

gulp.task("buildBackend",
    gulp.series(
        clear,
        gulp.parallel(
            compileTS,
            copyPackageJson,
            copySqlite,
            copyEnv
        )
    ))
