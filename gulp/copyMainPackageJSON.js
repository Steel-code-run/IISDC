const gulp = require("gulp");
gulp.task("copyMainPackageJson",(cb)=>{
    gulp.src('package.json')
        .pipe(gulp.dest('built'));
    cb()

});