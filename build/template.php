<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Stl-renderer – hello from a dynamic block!', 'stl-renderer' ); ?>
 	<H3><?php foreach ($attributes as $attribute) {
		echo $attribute;
	}?></H3>
	<H3><?php ?></H3>
	<div id="model" style="width: 500px; height: 500px"> </div>
	<script type="text/javascript">
		window.onload = function() {
			STLViewer("http://localhost:8080/wp-content/uploads/2022/09/Both_keychains.stl", "model")
		}
	</script>
</p>
