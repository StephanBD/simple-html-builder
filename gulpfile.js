const { src, dest, watch, parallel } = require("gulp");
var browserSync = require("browser-sync").create();

// var browserSync = require("browser-sync").create();

// pug --------------------
const pugPipe = require("gulp-pug");

const themeFolder = "laptop";
const projectPath = `pug_docs/`;
const destiny = "docs";


//-------------------pug----------------------------------//
// function pugDescription() {
// 	return src( "src/description.pug")
// 		.pipe(pugPipe())
// 		.pipe(dest(projectPath));
// }
function pugDoc() {
	return src("pug_doc/!(_)*.pug")
		.pipe(pugPipe())
		.pipe(dest(destiny));
}
// function pugTemplate() {
// 	return src( "src/pug_doc/!(_)*.pug")
// 		.pipe(pugPipe())
// 		.pipe(dest( "documentation"));
// }

// watch ---------------------
function watchpug() {
	// watch( "src/pug_template/*.pug", pugDoc);
	watch("**/*.pug", pugTemplate);
	// watch( "src/pug_partials/*.pug", parallel(pugDoc, pugTemplate));
}

// export ----------------------------------------------//
function watching() {
	browserSync.init({
		notify: false,
		open: true,
		server: destiny,
		baseDir: "./index.html"
	});
	// --------
	watch("**/*.pug", pugDoc);
	watch([destiny + "**/*"]).on("change", browserSync.reload);
}

// export --------------------------------------------//
// exports.pug = pugDescription;
exports.default = pugDoc
// exports.default = parallel(pugDoc, pugTemplate)
exports.watch = watchpug
exports.watching = watching
