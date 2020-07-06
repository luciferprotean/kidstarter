var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xADD8E6 );
//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
var mat = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geo, mat);

scene.add(plane);
plane.rotateX( - Math.PI / 2);
plane.position.set(0,0,0); 
plane.receiveShadow = true;   

let WIDTH = document.getElementById("centralColumnTopRow").offsetWidth;
let HEIGHT = document.getElementById("centralColumnTopRow").offsetHeight;
let PADDING = 4;

var loader = new THREE.FBXLoader();
//var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 500 );
var camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 1, 500 );
camera.position.set( 0, 145, 90 );
camera.lookAt( 0, 90, 0 );


loader.load( '../models/fbx/girl-walk.fbx', function ( object ) {

    scene.add( object );
    console.log(object);
    // object.position.set(0,-100,0);    

}, undefined, function ( e ) {

    console.error( e );
  
  } );


  var light = new THREE.DirectionalLight( 0xffffff, 5);
  light.position.set( 0, 200, 75 );
  light.castShadow = true;    
  scene.add( light );
  var sceneLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( sceneLight );


var renderer = new THREE.WebGLRenderer({ canvas: artifactCanvas });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//renderer.setSize( window.innerWidth, window.innerHeight );


//renderer.setSize( document.getElementById("centralColumnTopRow").width, document.getElementById("centralColumnTopRow").height );
renderer.setSize( WIDTH-PADDING, HEIGHT-PADDING );
//document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

var points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

var lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
var line = new THREE.Line( lineGeometry, lineMaterial );

var cube = new THREE.Mesh( geometry, material );
scene.add( line, cube );
//scene.add( line );

// camera.position.z = 5;
// camera.position.y = 2;
// camera.position.x = -1;


function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();