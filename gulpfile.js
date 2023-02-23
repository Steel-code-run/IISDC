const gulp = require('gulp');
require("./gulp/createBackendBuild");
require("./gulp/createPackagesBuild");
require("./gulp/copyMainPackageJSON");
require("./gulp/createFrontendBuild");
const clearBuilt = (cb)=>{
    try {
        execSync("rm -r ./built")
    }
    catch (e) {
        console.log(e)
    }
    cb();
}

gulp.task("build", gulp.series(
    clearBuilt,
    "buildBackend",
    "buildPackages",
    "copyMainPackageJson",
    "createFrontendBuild"
))

const {execSync} = require("child_process");
const Application = require('ssh-deploy-release');
require('dotenv').config()
require('localenv')

const deploy= (cb) => {
    const options = {
        localPath: './built',
        exclude: ["**/node_modules/**","**/node_modules","**/*.db"],
        share: {
            'sqlite/db': {
                symlink:"sqlite/db",
                mode: 777
            }
        },
        node_modules: {
            "node_modules": {
                symlink:"node_modules",
                mode: 777
            }
        },
        host: process.env.SSL_HOST,
        username: process.env.SSL_USER,
        password: process.env.SSL_PASSWORD,
        deployPath: '/var/built',
        currentReleaseLink: 'built',
        onAfterDeploy: 'pm2 delete all; cd /var/built/built ' +
            '&& npm install --production' +
            '&& pm2 serve frontend/build' +
            '&& pm2 start backend/src/app.js'
    };

    const deployer = new Application(options);
    deployer.deployRelease(() => {
        console.log('Ok backend!')
    });
    cb();
}

gulp.task("deploy",gulp.series(
    deploy
))