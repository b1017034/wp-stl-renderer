
class STLHandler{
	camera;
	renderer;
	controls;
	scene;

	light;
	mesh;

	//config
	initZoom = 1.0
	initLightColor = 0xffffff
	initColor = 0xFD841F
	initRotationX = 0
	initRotationY = 0
	initRotationZ = 0
	initLightX = 0
	initLightY = 0
	initLightZ = 0

	constructor(model, elementID, config) {

		this.setConfig(config)

		const elem = document.getElementById(elementID)
		if (elem) {
			this.initCamera(elem)

			this.initRenderer(elem)

			this.initControl()

			this.scene = new THREE.Scene();

			this.light = new THREE.HemisphereLight(this.initLightColor, 1000)
			this.initLight()
			this.scene.add(this.light);
			// this.scene.add(new THREE.DirectionalLight(this.initLightColor, 10.0));

			const stlHandler = this;
			(new THREE.STLLoader()).load(model, function (geometry) {

				const material = new THREE.MeshPhongMaterial({
					color: stlHandler.initColor,
					specular: 100,
					shininess: 100
				});

				stlHandler.mesh = new THREE.Mesh(geometry, material);
 				stlHandler.scene.add(stlHandler.mesh);
				stlHandler.initRotation()

				const middle = new THREE.Vector3();
				geometry.computeBoundingBox();
				geometry.boundingBox.getCenter(middle);
				stlHandler.mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
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
		}

	}

	remove() {
		this.scene.remove(this.mesh)
		this.mesh.material.dispose();
		this.mesh.geometry.dispose();
	}

	initCamera(elem) {
		this.camera = new THREE.OrthographicCamera(elem.clientWidth / -2, elem.clientWidth / 2, elem.clientHeight / 2, elem.clientHeight / -2);
		this.camera.zoom = this.initZoom;
		this.camera.updateProjectionMatrix();
	}

	initRenderer(elem) {
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setSize(elem.clientWidth, elem.clientHeight);
		this.renderer.setPixelRatio(elem.clientWidth/elem.clientHeight)
		elem.appendChild(this.renderer.domElement);
	}

	initControl() {
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.rotateSpeed = 0.5;
		this.controls.dampingFactor = 0.1;
		this.controls.enableZoom = true;
	}

	initRotation() {
		this.mesh.rotation.x = (this.initRotationX / 360.0) * Math.PI;
		this.mesh.rotation.y = (this.initRotationY / 360.0) * Math.PI;
		this.mesh.rotation.z = (this.initRotationZ / 360.0) * Math.PI;
	}

	initLight() {
		// this.light.position.x = (this.initLightX / 360.0) * Math.PI;
		// this.light.position.y = (this.initLightY / 360.0) * Math.PI;
		// this.light.position.z = (this.initLightZ / 360.0) * Math.PI;
		this.light.position.x = this.initLightX;
		this.light.position.y = this.initLightY;
		this.light.position.z = this.initLightZ;
	}

	setConfig(config){
		for (const configKey in config) {
			switch (configKey){
				case "initZoom":
					this.initZoom = config[configKey];
					// this.camera.zoom = config[configKey];
					// this.camera.updateProjectionMatrix();
					break;
				case "initColor":
					this.initColor = config[configKey];
					break;
				case "initRotationX":
					this.initRotationX = config[configKey];
					break;
				case "initRotationY":
					this.initRotationY = config[configKey];
					break;
				case "initRotationZ":
					this.initRotationZ = config[configKey];
					break;
				case "initLightX":
					this.initLightX = config[configKey];
					break;
				case "initLightY":
					this.initLightY = config[configKey];
					break;
				case "initLightZ":
					this.initLightZ = config[configKey];
					break;
			}
		}
	}



	// animate(){
	// 	requestAnimationFrame(() => this.animate);
	// 	this.controls.update();
	// 	this.renderer.render(this.scene, this.camera);
	// }

}
