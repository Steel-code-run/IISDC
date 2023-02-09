const gulp = require('gulp');
require("./gulp/createBackendBuild");
require("./gulp/createPackagesBuild");
require("./gulp/copyMainPackageJSON");
require("./gulp/createFrontendBuild");

gulp.task("createBuild", gulp.series(
    "buildBackend",
    "buildPackages",
    "copyMainPackageJson",
    "createFrontendBuild"
))