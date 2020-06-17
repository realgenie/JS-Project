  
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(60, 30, 35);
controls.update();

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
scene.add( directionalLight );

var ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

var light = new THREE.SpotLight(0xffffff, 0.5);
light.position.set(50,0,200);
scene.add(light);


var star = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('starfield.png'),
    geometry = new THREE.SphereGeometry(90, 64, 64), 
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
    geometry = new THREE.SphereGeometry(3, 32, 32),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            bumpMap: bump,
            bumpScale: 0.08,
            specularMap: spec
        }
    )
);
var earth = new THREE.Mesh(geometry, material)
scene.add(earth);



var clouds = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthmapcloudmap.jpg'),
    cloudGeometry = new THREE.SphereGeometry(3,  32, 32),
    cloudMaterial = new THREE.MeshPhongMaterial(
        {
            map: texture,
            transparent: true,
            opacity: 50
        }
    )
)
var clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);








function animate() {
    requestAnimationFrame(animate); 
    earth.rotation.y -= 0.0005;
    renderer.render(scene, camera);
};
animate();