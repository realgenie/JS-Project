var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera); //add?
camera.position.set(90, 0, 0);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);


var light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(-90,0,0);
scene.add(light);




var star = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('starfield.png'),
    geometry = new THREE.SphereGeometry(1000, 1, 1), 
    material = new THREE.MeshBasicMaterial(
        {
            map: texture,
            side: THREE.DoubleSide
        }
    )
);
var star = new THREE.Mesh(geometry, material)
scene.add(star);

var earth = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthmap1k.jpg'),
    bump = new THREE.TextureLoader().load('earthbump1k.jpg'),
    spec = new THREE.TextureLoader().load('earthspec1k.jpg'),
    geometry = new THREE.SphereGeometry(10, 50, 50),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            bumpMap: bump,
            bumpScale: 0.08,
            specularMap: spec,
            shininess: 3
        }
    )
);
var earth = new THREE.Mesh(geometry, material)
scene.add(earth);

var clouds = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthcloudmaptrans.jpg'),
    cloudGeometry = new THREE.SphereGeometry(10.09, 50, 50),
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
    geometry = new THREE.SphereGeometry(20, 50, 50),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            shininess: 1000
        }
    )
);
var sun = new THREE.Mesh(geometry, material)
sun.position.set(-90,0,0);
scene.add(sun);

var moon = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('moon_texture.jpg'),
    bump = new THREE.TextureLoader().load('moonbump1k.jpg'),
    geometry = new THREE.SphereGeometry(3.5, 50, 50),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            bumpMap: bump,
            bumpScale: 0.08,
         
        }
    )
);
var moon = new THREE.Mesh(geometry, material)
moon.position.set(40,0,0);
scene.add(moon);

var earthVec = new THREE.Vector3(0,0,0);

var r = 20;
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
    moon.position.x = r * Math.cos(theta);
    moon.position.z = r * Math.sin(theta);

      camera.position.x += dx;
      camera.position.y += dy;
      camera.position.z += dz;

      camera.lookAt(earthVec);

      if (camera.position.z < -100) {
        camera.position.set(0,35,70);
      }

      camera.lookAt(earthVec);

    renderer.render(scene, camera);
};
animate();