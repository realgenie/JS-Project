  
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 35, 70);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.update();

var directionalLight = new THREE.DirectionalLight( 0xffffff);
directionalLight.position.set(50,50,50);
scene.add( directionalLight );

var ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

var light = new THREE.SpotLight(0xffffff, 0.5);
light.position.set(50,0,200);
scene.add(light);


var star = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('starfield.png'),
    geometry = new THREE.SphereGeometry(50, 64, 64), 
    material = new THREE.MeshBasicMaterial(
        {
            map: texture,
            side: THREE.BackSide
        }
    )
);
var star = new THREE.Mesh(geometry, material)
scene.add(star);

var earth = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthmap1k.jpg'),
    bump = new THREE.TextureLoader().load('earthbump1k.jpg'),
    spec = new THREE.TextureLoader().load('earthspec1k.jpg'),
    geometry = new THREE.SphereGeometry(5, 32, 32),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            bumpMap: bump,
            bumpScale: 0.08,
            specularMap: spec,
            shininess: 2
        }
    )
);
var earth = new THREE.Mesh(geometry, material)
earth.position.set(0, 35, 70);
scene.add(earth);

var clouds = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthcloudmaptrans.jpg'),
    cloudGeometry = new THREE.SphereGeometry(3.09,  32, 32),
    cloudMaterial = new THREE.MeshPhongMaterial(
        {
            map: texture,
            side: THREE.DoubleSide,
            opacity: 0.15,
            transparent: true,
            depthWrite: false
        }
    )
)
var clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
earth.add(clouds);

var sun = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('sunmap.jpg'),
    geometry = new THREE.SphereGeometry(3, 32, 32),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            shininess: 2
        }
    )
);
var sun = new THREE.Mesh(geometry, material)
earth.position.set(0, 40, 65);
scene.add(sun);

var sunVec = new THREE.Vector3(0,0,0);

var r = 35;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;

var dx = .01;
var dy = -.01;
var dz = -.05;



function animate() {
    requestAnimationFrame(animate); 
    earth.rotation.y -= 0.009;
    clouds.rotation.y -= 0.005
      
    theta += dTheta;
    earth.position.x = r * Math.cos(theta);
    earth.position.z = r * Math.sin(theta);

    if (camera.position.z < 0) {
        dx *= -1;
      }
      camera.position.x += dx;
      camera.position.y += dy;
      camera.position.z += dz;

      camera.lookAt(sunVec);

      if (camera.position.z < -100) {
        camera.position.set(0,35,70);
      }

      camera.lookAt(sunVec);

    renderer.render(scene, camera);
};
animate();