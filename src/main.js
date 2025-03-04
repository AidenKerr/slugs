import './style.css';
import { render } from './render';
import { Slug } from './Slug';
import { Clock } from 'three';

class World {
    clock = new Clock();
    deltaClock = new Clock();
    deltaTime = 0.0;

    // number of slugs must be synced to N_SLUGS in fragment.glsl
    // number of spine segments must be synced to N_SEGMENTS
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
        new Slug([
            [[0.0, 0.0], 0.12],
            [[1.45, -0.5], 0.005],
            [[1.7, -0.5], 0.05],
            [[1.7, -0.5], 0.03],
            [[1.7, -0.5], 0.03],
        ]),
        // new Slug([
        //     [[0.0, 0.0], 0.12],
        //     [[1.45, -0.5], 0.005],
        //     [[1.7, -0.5], 0.05],
        //     [[1.7, -0.5], 0.03],
        //     [[1.7, -0.5], 0.03],
        // ]),
        // new Slug(
        //     [
        //         [[0.35, 0.57], 0.12],
        //         [[0.54, 0.73], 0.005],
        //         [[0.79, 0.71], 0.05],
        //         [[0.93, 0.5], 0.03],
        //         [[0.85, 0.27], 0.03],
        //     ]
        // ),
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

    constructor() {
        render(this.slugs, this.updateWorld, this.clock);

        document.addEventListener('visibilitychange', () => {
            this.deltaClock.getDelta(); // throwaway deltaTime when visibility changes
        });
    }

    updateWorld = () => {
        // TODO fix deltaTime spike when leaving + returning to window
        this.deltaTime = this.deltaClock.getDelta(); // update delta time
        for (let slug of this.slugs) {
            slug.movement.update(this.deltaTime, this.clock);
        }
    };
}

// let there be light
new World();
