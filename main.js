import './style.css';
import { render } from './render';
import { Slug } from './Slug';
import { Clock } from 'three';

class World {
    clock = new Clock();
    deltaClock = new Clock();
    deltaTime = 0.0;

    slugs = [
        new Slug(
            [
                [[1.0, 0.0], 0.12],
                [[-0.45, -0.5], 0.005],
                [[-0.7, -0.5], 0.05],
                [[-0.7, -0.5], 0.03],
                [[-0.7, -0.5], 0.03],
            ],
            true
        ),
        // new Slug([
        //     [[0.0, 0.0], 0.12],
        //     [[1.45, -0.5], 0.005],
        //     [[1.7, -0.5], 0.05],
        //     [[1.7, -0.5], 0.03],
        //     [[1.7, -0.5], 0.03],
        // ]),
        // new Slug([
        //     [[0.0, 0.0], 0.12],
        //     [[1.45, -0.5], 0.005],
        //     [[1.7, -0.5], 0.05],
        //     [[1.7, -0.5], 0.03],
        //     [[1.7, -0.5], 0.03],
        // ]),
        // new Slug([
        //     [[0.2, -0.5], 0.1],
        //     [[-0.45, -0.5], 0.005],
        //     [[-0.7, -0.5], 0.05],
        // ]),
        // new Slug([
        //     [[0.8, -0.3], 0.1],
        //     [[0.9, -1.3], 0.005],
        //     [[0.1, -1.3], 0.05],
        // ]),
        // new Slug([
        //     [[0.0, -0.0], 0.1],
        //     [[0.0, -1.0], 0.005],
        //     [[0.0, -1.0], 0.05],
        // ]),
    ];

    mousePos = {
        x: 0,
        y: 0,
    };

    constructor() {
        document.onmousemove = this.updateMouse;
        let a = render(this.slugs, this.updateWorld, this.clock);
    }

    updateWorld = () => {
        // update delta time
        this.deltaTime = this.deltaClock.getDelta();

        for (let slug of this.slugs) {
            slug.movement.update(this.mousePos, this.deltaTime, this.clock);
        }
    };

    updateMouse = (e) => {
        this.mousePos.x =
            ((e.pageX / window.innerWidth) * 2 - 1) *
            (window.innerWidth / window.innerHeight);
        this.mousePos.y = -(e.pageY / window.innerHeight) * 2 + 1;
    };
}

// let there be light
new World();
