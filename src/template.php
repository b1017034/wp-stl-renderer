<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Stl-renderer – hello from a dynamic block!', 'stl-renderer' ); ?>
<!--	<H3>--><?php //var_dump($attributes) ?><!--</H3>-->
	<div class="wp-block-stl-renderer-stl-model" id="<?php echo $attributes['stlId'] ?>" style="width: 500px; height: 500px"> </div>
	<script type="text/javascript">
		(function($) {
			$(document).ready(function(){
				console.log("<?php echo $attributes['stlId'] ?>")
				STLViewer("<?php echo $attributes['stlUrl'] ?>", "<?php echo $attributes['stlId'] ?>")
			});
		}(jQuery));
		//jQuery(function(){
		//	console.log("<?php //echo $attributes['stlId'] ?>//")
		//	STLViewer("<?php //echo $attributes['stlUrl'] ?>//", "<?php //echo $attributes['stlId'] ?>//")
		//});
	</script>
</p>
