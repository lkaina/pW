var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

var ip = '127.0.0.1';
var port = '3000';

var siteName;

http.createServer(requestHandler).listen(port, ip);

function requestHandler(req, res) {

  var filename;
  var parsedUrl = url.parse(req.url);
  var ext = path.extname(req.url);
  var qParams = parsedUrl.query;
  if (qParams && qParams.indexOf('cacheBuster') !== -1) {
    ext = ext.split('?')[0];
    qParams = null;
    req.url = req.url.split('?')[0];
  }

  if (!ext) {
    siteName = req.url;
    filename = '/index.html';
    ext = '.html'
  } else if (qParams) {
    pullData(qs.parse(parsedUrl.query));
    return;
  } else {
    if (path.dirname(req.url) === '/') {
      filename = siteName + '/' + path.basename(req.url)
    } else {
      filename = req.url;
    }
  }

  var validExtensions = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png",
    ".json": "application/javascript",
    ".woff": "application/font-woff",
    ".woff2": "application/font-woff2",
    ".ttf": "application/font-sfnt"
  };

  var localPath = __dirname + filename;
  console.log('local path: ', localPath);

  fs.exists(localPath, function (exists) {
    if (exists) {
      getFile(localPath, res, validExtensions[ext]);
    } else {
      res.writeHead(404);
      res.end();
    }
  });
};

var pullData = function(htmlUrl) {
  var htmlReq = http.get(htmlUrl.url, function(getRes){
    var resHtml = '';
    getRes.on('data', function(chunk){
      resHtml += chunk;
    });
    getRes.on('error', function(err){
      console.log("Error retrieving HTML from url");
    });
    getRes.on('end', function(){
      res.writeHead(200, headers);
      res.end(JSON.stringify(splitRes));
    });
  });

  htmlReq.on('error', function(err){
    console.log('error with request: ', err);
    res.writeHead(400);
    res.end();
  });
}

var getFile = function(localPath, response, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      console.log("localPath: ", localPath);
      console.log("response: ", response);
      console.log("mimeType: ", mimeType);
      response.setHeader("Content-Length", contents.length);
      response.setHeader("Content-Type", mimeType);
      response.setHeader("Access-Control-Allow-Origin", 'http://localhost:8282');
      response.statusCode = 200;
      response.end(contents);
    } else {
      response.writeHead(500);
      response.end();
    }
  });
};
