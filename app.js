var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const aws = require('aws-sdk');
const multer = require('multer');
const upload = multer({
  dest: 'public/uploads/' // this saves your file into a directory called "uploads"
});
// const db = require('./models')
// import models from './models';
require('dotenv').config()

const S3_BUCKET = process.env.S3_BUCKET_NAME;
aws.config.region = 'us-east-1';

const User = require('./models').User

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// It's very crucial that the file name matches the name attribute in your html
app.post('/upload', upload.single('myImage'), (req, res) => {
  console.log(res.req.file)
  db.Image.create({ image: res.req.file.path })
    .then(image => {
      console.log(image)
      res.json(image);

    })
});

app.get('/images', (req, res) => {
  db.Image.findAll()
    .then(images => {
      console.log(images)
      res.status(200).json({ images: images });
    })
    .catch(e => console.log(e));
})

app.get('/sign-s3', (req, res) => {
  console.log("AWS_SECRET_ACCESS_KEY", S3_BUCKET)
  console.log('sign-s3 route', req.query)
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    // SEQUELIZE returnData.url
    let newUser = {
      fullName: "Marc Wright",
      appName: "Marc Test",
      deployUrl: "https://pages.git.generalassemb.ly/alaghmani123/Project-2-prayer-times/",
      gitHubRepo: "https://git.generalassemb.ly/alaghmani123/Project-2-prayer-times",
      imageUrl: returnData.url,
      project: 3
    }

    User.create(newUser)
      .then(user => {
        returnData.user = user
        res.json(returnData);
        res.end();
      })

    // res.json(returnData);h
    // res.end();
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
