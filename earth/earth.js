var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( -90, 0, 90 );

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

var ambientLight = new THREE.AmbientLight( 0x404040 );
scene.add(ambientLight);

var light = new THREE.PointLight( 0xffffff );
light.position.set( 0, 0, 0 );
scene.add( light );

var star = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('starfield.png'),
    geometry = new THREE.SphereGeometry( 1000, 1, 1 ), 
    material = new THREE.MeshBasicMaterial(
        {
            map: texture,
            side: THREE.DoubleSide
        }
    )
);
var star = new THREE.Mesh( geometry, material )
scene.add(star);

var earth = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthmap.jpg'),
    bump = new THREE.TextureLoader().load('earthbump.jpg'),
    spec = new THREE.TextureLoader().load('earthspec.jpg'),
    geometry = new THREE.SphereGeometry( 6, 50, 50 ),
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
var earth = new THREE.Mesh( geometry, material )
earth.position.set( 0, 0, 0) ;
scene.add(earth);

var clouds = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('earthcloudmaptrans.jpg'),
    cloudGeometry = new THREE.SphereGeometry( 5.09, 50, 50 ),
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
var clouds = new THREE.Mesh( cloudGeometry, cloudMaterial );
earth.add(clouds);

var sun = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('sol.jpg'),
    geometry = new THREE.SphereGeometry( 15, 50, 50 ),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            shininess: 5,
            emissive: 0xf9521f
        }
    )
);
var sun = new THREE.Mesh( geometry, material )
scene.add(sun);

var moon = new THREE.Mesh(
    texture = new THREE.TextureLoader().load('moon_texture.jpg'),
    bump = new THREE.TextureLoader().load('moonbump.jpg'),
    geometry = new THREE.SphereGeometry( 3.5, 50, 50 ),
    material = new THREE.MeshPhongMaterial(
        {
            map: texture,
            bumpMap: bump,
            bumpScale: 0.08
         
        }
    )
);
var moon = new THREE.Mesh( geometry, material )
moon.position.set( 40, 0, 0 );
scene.add(moon);

var sunVec = new THREE.Vector3( 0, 0, 0 )
//var earthVec = new THREE.Vector3( 0, 1, 0 )

var theta = 0;
var dTheta = 2 * Math.PI / 1000;

var dx = 0.01;
var dy = -0.01;
var dz = -0.05;

function animate() {
    requestAnimationFrame(animate); 
    earth.rotation.y -= 0.06;
    clouds.rotation.y -= 0.05;
    
    
    theta -= dTheta;
    earth.position.x = 60 * Math.cos(theta);
    earth.position.z = 60 * Math.sin(theta);

    moon.position.x = 55 * Math.cos(theta) + 25 * Math.sin(theta);
    moon.position.z = 55 * Math.sin(theta) + 25 * Math.cos(theta);

    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;

    camera.lookAt(sunVec);
    //camera.lookAt(earthVec);

    renderer.render( scene, camera );
};
animate();



