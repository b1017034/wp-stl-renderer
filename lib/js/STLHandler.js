function STLHandler(model, elementID) {
	console.log("tes2t")
	const elem = document.getElementById(elementID)
	var camera = new THREE.OrthographicCamera(elem.clientWidth / - 2, elem.clientWidth / 2, elem.clientHeight / 2, elem.clientHeight / -2);

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(elem.clientWidth, elem.clientHeight);
	renderer.setPixelRatio(elem.clientWidth/elem.clientHeight)
	elem.appendChild(renderer.domElement);

	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.rotateSpeed = 0.5;
	controls.dampingFactor = 0.1;
	controls.enableZoom = true;
	const scene = new THREE.Scene();
	scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

	(new THREE.STLLoader()).load(model, function (geometry) {
		console.log(geometry)
		const material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: 100,
			shininess: 100
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const middle = new THREE.Vector3();
		geometry.computeBoundingBox();
		geometry.boundingBox.getCenter(middle);
		mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
			-middle.x, -middle.y, -middle.z ) );

		const largestDimension = Math.max(geometry.boundingBox.max.x,
			geometry.boundingBox.max.y,
			geometry.boundingBox.max.z);
		camera.position.z = largestDimension * 1.5;
		camera.zoom = 3
		camera.updateProjectionMatrix();
		console.log(camera)

		const animate = function () {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();
	});
}
