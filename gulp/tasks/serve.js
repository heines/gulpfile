const gulp = require('gulp');
const yargs = require('yargs').argv;
const browserSync = require('browser-sync');
const path = require("path");
const fs = require('fs');
const url = require("url");
const pug = require('pug');

const conf = require('../conf').serve;
const confPug = require('../conf').pug;

const getPugTemplatePath = (baseDir, req)=>{
  const requestPath = url.parse(req.url).pathname;
  const suffix = path.parse(requestPath).ext ? '' : 'index.html';
  return path.join(baseDir, "src/html", requestPath, suffix);
}

const pugMiddleWare = (req, res, next) => {
  const requestPath = getPugTemplatePath(process.cwd(), req);
  if (path.parse(requestPath).ext !== '.html') {
    return next();
  }
  const pugPath = requestPath.replace('.html', '.pug');
  console.log("[BS] rendering pug : "+ pugPath);
  const content = pug.renderFile(pugPath, {
    data: JSON.parse(fs.readFileSync(confPug.json)),
    pretty: true,
  });
  res.end(new Buffer(content));
}

gulp.task("serve",()=> {
  if (yargs.build == true) {
    conf.build.server.middleware = [pugMiddleWare];
    browserSync(conf.build);
  } else {
    conf.dest.server.middleware = [pugMiddleWare];
    browserSync(conf.dest);
  }
});
