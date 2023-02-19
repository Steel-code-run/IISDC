const gulp = require("gulp");
const {execSync} = require('child_process');
function clear(cb){
    try {
        execSync("rd -r built/frontend")
    }
    catch (e) {}
    cb();
}

function buildFrontend(cb){
    execSync("cd frontend && npm run build")
    cb()
}

function copyEnv(cb){
    gulp.src('frontend/.env.*')
        .pipe(gulp.dest('built/frontend'));
    cb()
}

function copyBuild(cb){
    gulp.src('frontend/build/**/*')
        .pipe(gulp.dest('built/frontend/build'));
    cb()
}

gulp.task("createFrontendBuild", gulp.series(
    clear,
    buildFrontend,
    copyEnv,
    copyBuild
))