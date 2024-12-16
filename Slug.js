import { Vector2 } from 'three';
import { SlugMovement } from './SlugMovement';

class circle {
    constructor(pos, radius) {
        this.pos = new Vector2(...pos);
        this.radius = radius;
    }
}

export class Slug {
    constructor(spine, followMouse = false) {
        this.spine = spine.map((v) => new circle(...v));

        this.movement = new SlugMovement(
            this,
            0.3,
            followMouse
                ? SlugMovement.STATES.MOUSE_CONTROLLED
                : SlugMovement.STATES.SCAN
        );
    }
}
