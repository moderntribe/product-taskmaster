var gulp        = require( 'gulp' );
var header      = require('gulp-header');
var postcss     = require( 'gulp-postcss' );
var cssnext     = require( 'postcss-cssnext' );
var cssimport   = require( 'postcss-import' );
var cssnested   = require( 'postcss-nested' );
var cssmixins   = require( 'postcss-mixins' );
var cssmqpacker = require( 'css-mqpacker' );

var postcss_task = function() {
	'use strict';

	var processors = [
		cssimport(),
		cssmixins(),
		cssnested(),
		cssnext(),
		cssmqpacker(),
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
  ].join( '\n' );

	return gulp.src( [
		'./src/resources/postcss/**/*.css',
		'!./src/resources/postcss/**/_*.css',
	] )
		.pipe( postcss( processors ) )
		.pipe( header( banner ) )
		.pipe( gulp.dest( './src/resources/css' ) );
};

gulp.task( 'postcss', postcss_task );
module.exports = postcss_task;
