import { Vector2 } from 'three';
import { SlugMovement } from './movement/SlugMovement';
import { MouseMovement } from './movement/MouseMovement';
import { ScanMovement } from './movement/ScanMovement';
import { TurnMovement } from './movement/TurnMovement';

class circle {
    constructor(pos, radius) {
        this.pos = new Vector2(...pos);
        this.radius = radius;
    }
}

export class Slug {
    constructor(spine, followMouse = false) {
        this.spine = spine.map((v) => new circle(...v));
        this.head = this.spine[0];
        this.blinking = true;
        this.handleBlink();

        const speed = 0.3;
        this.movement = new SlugMovement(
            this,
            speed,
            followMouse
                ? new MouseMovement(this, speed)
                : new TurnMovement(this, speed)
        );
    }

    handleBlink() {
        this.blinking = !this.blinking;
        if (this.blinking) {
            const blinkTime = 150;
            setTimeout(() => this.handleBlink(), blinkTime);
        } else {
            const min = 2000;
            const max = 10000;
            const delay = Math.random() * (max - min) + min;
            setTimeout(() => this.handleBlink(), delay);
        }
    }
}
