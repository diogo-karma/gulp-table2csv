
'use strict';

var map = require('map-stream'),
    Path = require('path'),
    env = require('jsdom').env;

module.exports = function (obj) {

  function parsePath(path) {
    var extname = Path.extname(path);
    return {
      dirname: Path.dirname(path),
      basename: Path.basename(path, extname),
      extname: extname
    };
  }

  function parseDOM(file, callback) {

    var parsedPath = parsePath(file.relative);
    var path;
    var type = typeof obj;

    if (type === 'string' && obj !== '') {

      path = obj;

    } else if (type === 'function') {

      var result = obj(parsedPath) || parsedPath;
      path = Path.join(result.dirname, result.basename + result.extname);

    } else if (type === 'object' && obj !== undefined && obj !== null) {

      var dirname = 'dirname' in obj ? obj.dirname : parsedPath.dirname,
        prefix = obj.prefix || '',
        suffix = obj.suffix || '',
        basename = 'basename' in obj ? obj.basename : parsedPath.basename,
        extname = 'extname' in obj ? obj.extname : parsedPath.extname;

      path = Path.join(dirname, prefix + basename + suffix + extname);

    } else {
      callback(new Error('Unsupported parameter type supplied'), undefined);
      return;
    }

    file.path = Path.join(file.base, path);

    env(file.contents + '', function (enverr, window) {
      var $ = require('jquery')(window);
      var nodes = $('table tr'), cols;
      var csv = [], csvLine;
      var x, i;
      for (i = 0; i < nodes.length; i ++) {
        cols = $((i === 0 ? 'th': 'td'), nodes.eq(i));
        csvLine = [];
        for (x = 0; x < cols.length; x++) {
          csvLine.push('"' + cols.eq(x).text()
              .replace(/\x22/img, '\x22\x22') + '"');
        }
        csv.push(csvLine.join(','));
      }
      file.contents = new Buffer(csv.join('\n'));
      callback(null, file);
    });

  }

  return map(parseDOM);
};
