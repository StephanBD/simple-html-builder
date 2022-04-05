let mix = require('laravel-mix');


//-----------------------------------------------------//
const themeFolder = "laptop";
const destiny = "docs";

//-----------------------------------------------------//

mix
	.sass(`scss/doc.scss`, `/css/main.css`)
	// .sass(`scss/doc.scss`, `documentation/css/main.css`)

	//-----------------------------------------------------//
	.js(`javascript/doc.js`, `/js/app.js`)
	// .js(`javascript/doc.js`, 'documentation/js/app.js')


	//-----------------------------------------------------//
	.sourceMaps(true, "source-map")
	//-----------------------------------------------------//
	.options({
		// extractVueStyles: false,
		processCssUrls: true,
		// terser: {},
		// purifyCss: false,
		// //purifyCss: {},
		// postCss: [require('autoprefixer')],
		// autoprefixer: { remove: false },
		clearConsole: false,
		// cssNano: { calc: false }
		// cssNano: {
		// 	discardComments: { removeAll: true },
		// }
	})
	//-----------------------------------------------------//
	.setPublicPath(`docs`)
// .disableNotifications()
// .version()

