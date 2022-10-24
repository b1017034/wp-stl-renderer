<p <?php echo get_block_wrapper_attributes(); ?>>
<!--	--><?php //esc_html_e( 'Stl-renderer – hello from a dynamic block!', 'stl-renderer' ); ?>
<!--	<H3>--><?php //var_dump($attributes) ?><!--</H3>-->
	<div class="wp-block-stl-renderer-stl-model"
		 id="<?php echo $attributes['stlId'] ?>"
		 style="width: <?php echo $attributes['borderWidth'] ?>px;
				 height: <?php echo $attributes['borderHeight'] ?>px;">
	</div>
	<script type="text/javascript">
		(function($) {
			$(document).ready(function(){
				console.log("<?php echo $attributes['stlId'] ?>")
				new STLHandler(
					"<?php echo $attributes['stlUrl'] ?>",
					"<?php echo $attributes['stlId'] ?>",
					<?php echo json_encode($attributes); ?>
				)
			});
		}(jQuery));
	</script>
</p>
