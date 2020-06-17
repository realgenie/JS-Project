var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var texture = new THREE.TextureLoader().load('earthmap1k.jpg');
var geometry   = new THREE.SphereGeometry(5, 32, 32)
var material  = new THREE.MeshPhongMaterial(
    {
        map: texture
    }
)
var earth = new THREE.Mesh(geometry, material)
scene.add(earth);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(-90,-60, 60);
controls.update();

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1);
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2);
scene.add( directionalLight );

var ambientLight = new THREE.AmbientLight(0x0f0f0f,3);
scene.add(ambientLight);

var light = new THREE.SpotLight(0xffffff, 0.5);
light.position.set(50,0,200);
scene.add(light);





function animate() {
    requestAnimationFrame(animate); 
    renderer.render(scene, camera);
};
animate();