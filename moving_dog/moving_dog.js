var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(60,60,60);
controls.update();

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1);
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2);
scene.add( directionalLight );

var ambientLight = new THREE.AmbientLight(0x0f0f0f,1.5);
scene.add(ambientLight);

var light = new THREE.SpotLight(0xffffff, 0.5);
light.position.set(50,0,200);
scene.add(light);

var doggy = new Object();

var texture = new THREE.TextureLoader().load('13466_Canaan_Dog_diff.jpg');

var objLoader = new THREE.OBJLoader;
objLoader.load(
    '13466_Canaan_Dog_v1_L3.obj',
    
    function(object){
        doggy.object = object;
        var material = new THREE.MeshPhysicalMaterial(
            { 
                map: texture 
            });
       
        object.traverse(function(child) {
            if(child instanceof THREE.Mesh) {
                child.material = material;
            }
        })
        scene.add(object);
    }
);

document.addEventListener('mousedown', onDocumentMouseDown, false);
function onDocumentMouseDown() {
    animate();
}

function animate() {
    requestAnimationFrame(animate); 
    doggy.object.rotation.x += 0.01; 
    doggy.object.rotation.y += 0.01;
    renderer.render(scene, camera);
};
animate();