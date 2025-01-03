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
        this.blinking = true;
        this.handleBlink();

        this.movement = new SlugMovement(
            this,
            0.3,
            followMouse
                ? SlugMovement.STATES.MOUSE_CONTROLLED
                : SlugMovement.STATES.SCAN
        );
    }

    handleBlink() {
        this.blinking = !this.blinking;
        if (this.blinking) {
            setTimeout(() => this.handleBlink(), 150);
        } else {
            const min = 2000;
            const max = 10000;
            const delay = Math.random() * (max - min) + min;
            setTimeout(() => this.handleBlink(), delay);
        }
    }
}
