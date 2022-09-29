class STLHandler{
	camera;
	renderer;
	controls;
	scene;

	constructor(model, elementID, config) {
		const elem = document.getElementById(elementID)
		this.camera = new THREE.OrthographicCamera(elem.clientWidth / -2, elem.clientWidth / 2, elem.clientHeight / 2, elem.clientHeight / -2);

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setSize(elem.clientWidth, elem.clientHeight);
		this.renderer.setPixelRatio(elem.clientWidth/elem.clientHeight)
		elem.appendChild(this.renderer.domElement);

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.rotateSpeed = 0.5;
		this.controls.dampingFactor = 0.1;
		this.controls.enableZoom = true;

		this.scene = new THREE.Scene();
		this.scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

		const stlHandler = this;
		(new THREE.STLLoader()).load(model, function (geometry) {

			const material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				specular: 100,
				shininess: 100
			});
			const mesh = new THREE.Mesh(geometry, material);
			stlHandler.scene.add(mesh);

			const middle = new THREE.Vector3();
			geometry.computeBoundingBox();
			geometry.boundingBox.getCenter(middle);
			mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
				-middle.x, -middle.y, -middle.z));

			const largestDimension = Math.max(geometry.boundingBox.max.x,
				geometry.boundingBox.max.y,
				geometry.boundingBox.max.z);
			stlHandler.camera.position.z = largestDimension * 1.5;

			const animate = function () {
				requestAnimationFrame(animate);
				stlHandler.controls.update();
				stlHandler.renderer.render(stlHandler.scene, stlHandler.camera);
			};
			animate();
		});

		this.setConfig(config)
	}

	setConfig(config){
		for (const configKey in config) {
			console.log(configKey)
			switch (configKey){
				case "initZoom":
					this.camera.zoom = config[configKey]
					this.camera.updateProjectionMatrix();
			}
		}
	}

	// animate(){
	// 	requestAnimationFrame(() => this.animate);
	// 	this.controls.update();
	// 	this.renderer.render(this.scene, this.camera);
	// }

}

// function STLHandler(model, elementID, config) {
// 	console.log(config["test"])
// 	const elem = document.getElementById(elementID)
// 	const camera = new THREE.OrthographicCamera(elem.clientWidth / -2, elem.clientWidth / 2, elem.clientHeight / 2, elem.clientHeight / -2);
//
// 	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// 	renderer.setSize(elem.clientWidth, elem.clientHeight);
// 	renderer.setPixelRatio(elem.clientWidth/elem.clientHeight)
// 	elem.appendChild(renderer.domElement);
//
// 	const controls = new THREE.OrbitControls(camera, renderer.domElement);
// 	controls.enableDamping = true;
// 	controls.rotateSpeed = 0.5;
// 	controls.dampingFactor = 0.1;
// 	controls.enableZoom = true;
// 	const scene = new THREE.Scene();
// 	scene.add(new THREE.HemisphereLight(0xffffff, 1.5));
//
// 	(new THREE.STLLoader()).load(model, function (geometry) {
// 		console.log(geometry)
// 		const material = new THREE.MeshPhongMaterial({
// 			color: 0xffffff,
// 			specular: 100,
// 			shininess: 100
// 		});
// 		const mesh = new THREE.Mesh(geometry, material);
// 		scene.add(mesh);
//
// 		const middle = new THREE.Vector3();
// 		geometry.computeBoundingBox();
// 		geometry.boundingBox.getCenter(middle);
// 		mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
// 			-middle.x, -middle.y, -middle.z ) );
//
// 		const largestDimension = Math.max(geometry.boundingBox.max.x,
// 			geometry.boundingBox.max.y,
// 			geometry.boundingBox.max.z);
// 		camera.position.z = largestDimension * 1.5;
// 		camera.zoom = 3
// 		camera.updateProjectionMatrix();
//
// 		const animate = function () {
// 			requestAnimationFrame(animate);
// 			controls.update();
// 			renderer.render(scene, camera);
// 		};
// 		animate();
// 	});
// }
