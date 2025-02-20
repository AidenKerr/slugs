import { Vector2 } from 'three';

export class CrawlMovement {
    constructor(slug, speed) {
        this.slug = slug;
        this.speed = speed;
        this.neck = new Vector2().subVectors(
            this.slug.spine[0].pos,
            this.slug.spine[1].pos
        );
    }

    update(deltaTime, clock, changeState) {
        if (this.destination == null) {
            this.pickFovDestination();
        }

        let diff = new Vector2().subVectors(
            this.destination,
            this.slug.head.pos
        );

        if (diff.length() < 0.01) {
            return 'RANDOM_STATE';
        }

        return [diff.normalize().multiplyScalar(this.speed * deltaTime)];
    }

    pickFovDestination() {
        // TODO do I want speed to vary? and slug need to gain momentum from 0? maybe it can stop on a dime though

        const min = 0.3;
        const max = 0.9;
        const distance = Math.random() * (max - min) + min;

        this.destination = new Vector2()
            .copy(this.slug.head.pos)
            .add(this.neck.multiplyScalar(distance));
    }
}
