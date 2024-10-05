import './style.css';
import * as THREE from 'three';

const loader = new THREE.FileLoader();
function loadShader(path) {
    return new Promise((resolve, reject) => {
        loader.load(path, resolve, undefined, reject);
    });
}

const vertexShader = await loadShader('vertex.glsl');
const fragmentShader = await loadShader('fragment.glsl');

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    0.1,
    1000
);
camera.position.z = 1;

const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { value: 1.0 },
        ratio: { value: window.innerWidth / window.innerHeight },
    },
});
const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

function animate() {
    material.uniforms.time.value += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
