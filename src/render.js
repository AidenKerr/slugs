import * as THREE from 'three';

async function setupShaders() {
    const loader = new THREE.FileLoader();
    function loadShader(path) {
        return new Promise((resolve, reject) => {
            loader.load(path, resolve, undefined, reject);
        });
    }

    return Promise.all([
        loadShader('vertex.glsl'),
        loadShader('fragment.glsl'),
    ]);
}

function setupScene(vertexShader, fragmentShader, slugs) {
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

    const geometry = new THREE.PlaneGeometry(
        window.innerWidth,
        window.innerHeight
    );
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            time: { value: 1.0 },
            ratio: { value: window.innerWidth / window.innerHeight },
            slugs: {
                value: slugs,
            },
        },
    });
    const plane = new THREE.Mesh(geometry, material);

    scene.add(plane);

    return { renderer, material, scene, camera };
}

function updateUniforms(uniforms, clock) {
    uniforms.time.value = clock.getElapsedTime();
}

export async function render(slugs, updateWorld, clock) {
    const [vertexShader, fragmentShader] = await setupShaders();
    const { renderer, material, scene, camera } = setupScene(
        vertexShader,
        fragmentShader,
        slugs
    );

    function update() {
        updateWorld();
        updateUniforms(material.uniforms, clock);
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(update);
}
