module.exports = function( gulp ) {
	'use strict';

	var header      = require('gulp-header');
	var postcss     = require( 'gulp-postcss' );
	var presetEnv   = require( 'postcss-preset-env' );
	var cssimport   = require( 'postcss-import' );
	var cssnested   = require( 'postcss-nested' );
	var cssmixins   = require( 'postcss-mixins' );
	var csshexrgba  = require( 'postcss-hexrgba' );
	var cssmqpacker = require( 'css-mqpacker' );
	var rename      = require( 'gulp-rename' );

	var task = function() {
		var processors = [
			cssimport(),
			cssmixins(),
			cssnested(),
			presetEnv( { stage: 0 } ),
			cssmqpacker(),
			csshexrgba()
		];

		var banner = [
			'/**',
			' * This CSS file was auto-generated via PostCSS',
			' *',
			' * Contributors should avoid editing this file, but instead edit the associated',
			' * src/resources/postcss/ file. For more information, check out our engineering',
			' * docs on how we handle CSS in our engineering docs.',
			' *',
			' * @see: http://moderntribe.github.io/products-engineering/css/',
			' */',
			'',
			'',
		].join( '\n' );

		return gulp.src( [
			'./src/resources/postcss/**/*.pcss',
			'!./src/resources/postcss/**/_*.pcss',
		] )
		.pipe( postcss( processors ) )
		.pipe( header( banner ) )
		.pipe(
			rename( {
				extname: '.css'
			} )
		)
		.pipe( gulp.dest( './src/resources/css' ) );
	};

	gulp.task( 'postcss', task );
};
