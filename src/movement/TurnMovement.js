import { Vector2 } from 'three';

export class TurnMovement {
    mousePos = {
        x: 0,
        y: 0,
    };

    constructor(slug, speed) {
        this.slug = slug;
        this.speed = speed;
        this.center = new Vector2().copy(this.slug.head.pos);
        this.destination = this.slug.head.pos;
        this.t = 0;
    }

    update(deltaTime, clock) {
        // TODO need to adjust the phase using starting angle somehow?

        const r = 1;
        const s = 0.5;
        this.t += deltaTime;
        this.destination = new Vector2(
            r * Math.cos(this.t * s),
            r * Math.sin(this.t * s)
        ).add(this.center);

        let diff = new Vector2().subVectors(
            this.destination,
            this.slug.head.pos
        );

        // TODO need to determine when to stop the turn
        // if (diff.length() < 0.01) {
        //     return true;
        // }

        this.slug.head.pos.add(
            diff.normalize().multiplyScalar(this.speed * deltaTime)
        );

        return false;
    }
}
