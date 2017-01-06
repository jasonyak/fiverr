var gulp = require('gulp');
var util = require('gulp-util');
var fs = require("fs");
var awspublish = require('gulp-awspublish');

// Place follow at location ./config/gulp/DO_NOT_PUSH.json to deploy to S3
// {
//     "accessKeyId" : "XXXXXX",
//     "secretAccessKey" : "XXXXXXXX",
//     "params" : {"Bucket" : "tony-web-app"},
//     "region" : "us-east-1"
// }
var awsConfig = JSON.parse(fs.readFileSync('./DO_NOT_PUSH.json'));

gulp.task('test', function() {
  util.log("test");
});

gulp.task('deploy-alpha',  function() {
    awsConfig.params.Bucket = awsConfig.params.Bucket + "-alpha";
    var publisher = awspublish.create(awsConfig);
    var headers = { 'Cache-Control': 'max-age=10, no-transform, public' };

    // push all the contents of ./build folder to s3
    gulp.src('./dist/**/*')
        .pipe(publisher.publish(headers))
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
});

gulp.task('deploy-prod', function() {
    awsConfig.params.Bucket = awsConfig.params.Bucket + "-prod";
    var publisher = awspublish.create(awsConfig);
    var headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };

    // push all the contents of ./build folder to s3
    gulp.src('./dist/**/*')
        .pipe(publisher.publish(headers))
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
});

