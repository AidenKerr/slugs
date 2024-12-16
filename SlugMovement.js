import { Vector2 } from 'three';

export class SlugMovement {
    static STATES = {
        MOUSE_CONTROLLED: 'mouse_controlled',
        SCAN: 'scan',
    };

    constructor(slug, speed, state = this.STATES.SCAN) {
        this.state = state;
        this.slug = slug;
        this.head = slug.spine[0];
        this.neck = new Vector2().subVectors(
            slug.spine[0].pos,
            slug.spine[1].pos
        );
        this.speed = speed;
    }

    update(mousePos, deltaTime, clock) {
        switch (this.state) {
            case SlugMovement.STATES.MOUSE_CONTROLLED:
                this.mouseMovement(mousePos);
                break;
            case SlugMovement.STATES.SCAN:
                this.scanningMovement(deltaTime, clock);
                break;
            default:
                console.warn('unknown movement state for slug', this.slug);
        }

        this.updateSpine();
    }

    updateSpine() {
        for (let i = 1; i < this.slug.spine.length; i++) {
            let separation = 0.25;

            let anchor = this.slug.spine[i - 1].pos;
            let current = this.slug.spine[i].pos;
            let diff = new Vector2()
                .subVectors(current, anchor)
                .setLength(separation);
            this.slug.spine[i].pos = diff.add(anchor);
        }
    }

    moveHead(vec, overwrite = false) {
        if (overwrite) {
            this.head.pos = vec;
        } else {
            this.head.pos.add(vec);
        }
    }

    scanningMovement(deltaTime, clock) {
        const scanAmount = 0.5;

        // vector orthogonal to neck
        let orth = new Vector2(this.neck.y, -this.neck.x).normalize();
        let scanFunc = scanAmount * Math.cos(clock.getElapsedTime());

        // TODO attempt at other scanning functions (linear)
        // let t = clock.getElapsedTime();
        // let p = 4.0;
        // let scanFunc = Math.min((t - 2.0) % p, p - ((t - 2.0) % p)) - 1.0;

        orth.multiplyScalar(scanFunc);

        this.moveHead(orth.multiplyScalar(this.speed * deltaTime));
    }

    mouseMovement(mousePos) {
        this.moveHead(new Vector2(...Object.values(mousePos)), true);
    }
}
