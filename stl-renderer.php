<?php
/**
 * Plugin Name:       Stl-renderer
 * Description:       Stl render
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            b1017034
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       stl-renderer
 *
 * @package           stl-renderer
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function stl_renderer_stl_renderer_block_init() {
	register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'stl_renderer_stl_renderer_render_callback',
		)
	);
}
add_action( 'init', 'stl_renderer_stl_renderer_block_init' );

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function stl_renderer_stl_renderer_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'build/template.php';

	wp_enqueue_script( 'three.min.js', plugins_url( 'lib/js/three.min.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	wp_enqueue_script( 'STLLoader.js', plugins_url( 'lib/js/STLLoader.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	wp_enqueue_script( 'OrbitControls.js', plugins_url( 'lib/js/OrbitControls.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	wp_enqueue_script( 'stl_viewer.js', plugins_url( 'lib/js/STLHandler.min.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	return ob_get_clean();
}

function stl_renderer_dependencies_import(){
	wp_enqueue_script( 'three.min.js', plugins_url( 'lib/js/three.min.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	wp_enqueue_script( 'STLLoader.js', plugins_url( 'lib/js/STLLoader.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	wp_enqueue_script( 'OrbitControls.js', plugins_url( 'lib/js/OrbitControls.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
	wp_enqueue_script( 'stl_viewer.js', plugins_url( 'lib/js/STLHandler.min.js', __FILE__ ), array(), filemtime(plugins_url( 'lib/js/three.min.js', __FILE__ )));
}
add_action( 'enqueue_block_editor_assets', 'stl_renderer_dependencies_import' );
