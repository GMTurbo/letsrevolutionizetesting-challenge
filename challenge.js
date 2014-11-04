var http = require('http');

var options = {
  host: 'letsrevolutionizetesting.com',
  path: '/challenge.json'
}

var getContent = function(options, cb) {
  var request = http.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      cb(JSON.parse(data).follow);
    });
  });
  request.on('error', function(e) {
    console.log(e.message);
  });
  request.end();
};

var callback = function(newUrl) {
  if (!newUrl || newUrl.indexOf("challenge?") === -1) {
    console.log("done");
    process.exit();
  }
  newUrl = newUrl.replace("http://letsrevolutionizetesting.com","");
  options.path = newUrl.replace("challenge?", "challenge.json?");
  console.log('going to: ' + options.path);
  getContent(options, callback);
};

getContent(options, callback)
