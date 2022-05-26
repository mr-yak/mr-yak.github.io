import * as THREE from 'https://mr-yak.github.io/sports/node_modules/three';


import { OrbitControls } from 'https://mr-yak.github.io/sports/node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'https://mr-yak.github.io/sports/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

var mousex,mousey;
var ball;
var loaded = false;
var zoom;
const debugy = false;
const body =document.getElementById("body")
const canvas = document.querySelector('#bg')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, (canvas.clientWidth) / (canvas.clientHeight), 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(10);
camera.position.setZ(2.7);

const loader = new GLTFLoader();

loader.load( '../../Assets/tennis.glb', function ( gltf ) {
	ball = gltf.scene
	ball.position.x = 0;
	ball.position.y = 0;
	ball.position.z = 0;
	scene.add(ball);
	loaded = true;
}, undefined, function ( error ) {
	console.error(error);
} );

const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
scene.add(ambientLight);

if (debugy) {
	const grid = new THREE.GridHelper(200,50);
	scene.add(grid);

	const controls = new OrbitControls(camera, renderer.domElement);
}


function animate(){
	let offsetx = (window.innerWidth/5);
	//console.log(offsetx);
	let offsety = 410
	let sensx = 0.001
	let sensy = 0.001
	
	if(Math.round(camera.position.z*20)/20<zoom){
		camera.position.z += 0.05
	}
	else if(Math.round(camera.position.z*20)/20>zoom){
		camera.position.z -= 0.05
	}
	
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
	if (loaded){
		ball.rotation.y = (mousex-offsetx)*sensx;
		ball.rotation.x = (mousey-offsety)*sensy;
	}

}
animate();

document.addEventListener('mousemove', onMouseUpdate, false)
function onMouseUpdate(e) {
	  mousex = e.clientX
	  mousey = e.clientY;
  };

document.addEventListener('mouseenter', onMouseUpdate, false);

canvas.addEventListener("mouseenter", zoomIn, false);
canvas.addEventListener("mouseout", zoomOut, false);

function zoomIn(){
	zoom = 2;
}


function zoomOut(){
	zoom = 2.7;
}