<p <?php echo get_block_wrapper_attributes(); ?>>
 <?php esc_html_e( 'Stl-renderer – hello from a dynamic block!', 'stl-renderer' ); ?>
	<H4>TEST</H4>
	<script src="/build/three.min.js"></script>
	<script src="/examples/js/loaders/STLLoader.js"></script>
	<script src="/examples/js/controls/OrbitControls.js"></script>
	<div id="model" style="width: 1000px; height: 1000px"> </div>
	<script>
		function STLViewer(model, elementID) {
			var elem = document.getElementById(elementID)
			// var camera = new THREE.PerspectiveCamera(70,
			// elem.clientWidth/elem.clientHeight, 1, 1000);
			var camera = new THREE.OrthographicCamera(- elem.clientHeight, elem.clientHeight, elem.clientWidth, -elem.clientWidth, 1, 1000);

			var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(elem.clientWidth, elem.clientHeight);
			elem.appendChild(renderer.domElement);
			window.addEventListener('resize', function () {
				renderer.setSize(elem.clientWidth, elem.clientHeight);
				camera.aspect = elem.clientWidth/elem.clientHeight;
				camera.updateProjectionMatrix();
			}, false);

			var controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.rotateSpeed = 0.1;
			controls.dampingFactor = 0.1;
			controls.enableZoom = true;
			// controls.autoRotate = true;
			// controls.autoRotateSpeed = .75;

			var scene = new THREE.Scene();
			scene.add(new THREE.HemisphereLight(0xffffff, 1.5));
			(new THREE.STLLoader()).load(model, function (geometry) {
				var material = new THREE.MeshPhongMaterial({
					color: 0xffffff,
					specular: 100,
					shininess: 100 });
				var mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);

				var middle = new THREE.Vector3();
				geometry.computeBoundingBox();
				geometry.boundingBox.getCenter(middle);
				mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
					-middle.x, -middle.y, -middle.z ) );

				var largestDimension = Math.max(geometry.boundingBox.max.x,
					geometry.boundingBox.max.y,
					geometry.boundingBox.max.z)
				camera.position.z = largestDimension * 1.5;

				var animate = function () {
					requestAnimationFrame(animate);
					controls.update();
					renderer.render(scene, camera);
				};
				animate();
			});
		}
	</script>
	<script type="text/javascript">
		window.onload = function() {
			STLViewer("./bite.stl", "model")
		}
	</script>
</p>
