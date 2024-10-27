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

function setupScene(vertexShader, fragmentShader) {
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
                value: [
                    {
                        spine: [
                            { pos: new THREE.Vector2(0.0, 0.0), radius: 0.5 },
                        ],
                    },
                    {
                        spine: [
                            { pos: new THREE.Vector2(0.75, 0.0), radius: 0.25 },
                        ],
                    },
                    {
                        spine: [
                            {
                                pos: new THREE.Vector2(-0.25, 0.8),
                                radius: 0.25,
                            },
                        ],
                    },
                ],
            },
        },
    });
    const plane = new THREE.Mesh(geometry, material);

    scene.add(plane);

    return { renderer, material, scene, camera };
}

export async function render(slugs) {
    const [vertexShader, fragmentShader] = await setupShaders();
    const { renderer, material, scene, camera } = setupScene(
        vertexShader,
        fragmentShader,
        slugs
    );

    function animate() {
        material.uniforms.time.value += 0.01;
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
}
