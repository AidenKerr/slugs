import { Vector2 } from 'three';

export class ScanMovement {
    constructor(slug, speed) {
        this.slug = slug;
        this.speed = speed;
        this.neck = new Vector2().subVectors(
            this.slug.spine[0].pos,
            this.slug.spine[1].pos
        );
    }

    update(deltaTime, clock) {
        // this scanning system is broken... cosine movements means starting in-phase is important
        // ideally that is irrelevant rather than correcting for it.. sinusoidal motion is not important
        // can I do this without cos/sin?

        const scanAmount = 0.5;

        // vector orthogonal to neck
        let orth = new Vector2(this.neck.y, -this.neck.x).normalize();
        let scanFunc = scanAmount * Math.cos(clock.getElapsedTime());

        // TODO attempt at other scanning functions (linear)
        // let t = clock.getElapsedTime();
        // let p = 4.0;
        // let scanFunc = Math.min((t - 2.0) % p, p - ((t - 2.0) % p)) - 1.0;

        orth.multiplyScalar(scanFunc);
        this.slug.head.pos.add(orth.multiplyScalar(this.speed * deltaTime));
        return false;
    }
}
