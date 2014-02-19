# gulp-table2csv

gulp-table2csv is a [gulp](https://github.com/wearefractal/gulp) plugin to convert html table to csv easily.

## Usage

gulp-table2csv provides simple file converting methods.

```javascript
var table2csv = require("gulp-table2csv");

// convert via function
gulp.task('html2csv', function() {
	return gulp.src('./html/*.html')
	    .pipe(table2csv(function (path) {
	        path.dirname += "/csv";
	        path.extname = ".csv"
	    }))
	    .pipe(gulp.dest("./"));
});


// convert via hash
gulp.task('html2csv', function() {
	return gulp.src("./src/main/text/yo.html", { base: process.cwd() })
	    .pipe(table2csv({
			dirname: "main/text/ciao",
			basename: "aloha",
			prefix: "bonjour-",
			suffix: "-hola",
			extname: ".csv"
	    })
	    .pipe(gulp.dest("./"));
});
```


## Notes

* `dirname` is the relative path from the base directory set by `gulp.src` to the filename.
  * `gulp.src()` uses glob-stream which sets the base to the parent of the first directory glob (`*`, `**`, [], or extglob). `dirname` is the remaining directories or `./` if none. glob-stream versions >= 3.1.0 (used by gulp >= 3.2.2) accept a `base` option, which can be used to explicitly set the base.
  * `gulp.dest()` renames the directories between `process.cwd()` and `dirname` (i.e. the base relative to CWD). Use `dirname` to rename the directories matched by the glob or descendents of the base of option.
  * KNOWN ISSUE: The base set when using brace expansion may not be what you expect (See wearefractal/glob2base#1). Use the `base` option described above.
* `basename` is the filename without the extension like path.basename(filename, path.extname(filename)).
* `extname` is the file extension including the '.' like path.extname(filename).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
