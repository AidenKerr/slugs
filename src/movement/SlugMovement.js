import { Vector2 } from 'three';

export class SlugMovement {
    // TODO implement: I noticed that by picking destinations to the front left/right you get a crawling motion. its fun
    static STATES = {
        MOUSE_CONTROLLED: 'mouse_controlled',
        MOUSE_INSTANT: 'mouse_instant',
        SCAN: 'scan',
        CRAWL: 'crawl',
    };

    constructor(slug, speed, state = this.STATES.SCAN) {
        this.slug = slug;
        this.head = slug.spine[0];
        this.changeState(state);
        this.speed = speed;
        this.destination == null;
        this.queuedMovement = null;
    }

    changeState(newState) {
        // handle interupted queued movements
        clearTimeout(this.queuedMovement);

        this.destination = null;
        this.state = newState;
        // TODO note for refactoring. This is potentially misleading.
        // it is not the current neck but rather the neck when state was changed.
        this.neck = new Vector2().subVectors(
            this.slug.spine[0].pos,
            this.slug.spine[1].pos
        );

        if (
            this.state == SlugMovement.STATES.MOUSE_CONTROLLED ||
            this.state == SlugMovement.STATES.MOUSE_INSTANT
        )
            return;
        // timeout for state change (this can be refactored to be events based, maybe?)
        // TODO if refactored to add events, be sure to cancel any timeouts
        const min = 3000;
        const max = 5000;
        const delay = Math.random() * (max - min) + min;
        const nextState = this.pickRandomState();

        this.queuedMovement = setTimeout(
            () => this.changeState(nextState),
            delay
        );
    }

    pickRandomState() {
        // TODO make random
        return this.state == SlugMovement.STATES.CRAWL
            ? SlugMovement.STATES.SCAN
            : SlugMovement.STATES.CRAWL;
    }

    update(mousePos, deltaTime, clock) {
        switch (this.state) {
            case SlugMovement.STATES.MOUSE_CONTROLLED:
                this.mouseMovement(deltaTime, mousePos);
                break;
            case SlugMovement.STATES.MOUSE_INSTANT:
                this.instantMouseMovement(mousePos);
                break;
            case SlugMovement.STATES.SCAN:
                this.scanningMovement(deltaTime, clock);
                break;
            case SlugMovement.STATES.CRAWL:
                this.crawlingMovement(deltaTime);
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

    pickFovDestination() {
        // TODO do I want speed to vary? and slug need to gain momentum from 0? maybe it can stop on a dime though

        const min = 0.3;
        const max = 0.9;
        const distance = Math.random() * (max - min) + min;

        this.destination = new Vector2()
            .copy(this.head.pos)
            .add(this.neck.multiplyScalar(distance));
    }

    scanningMovement(deltaTime, clock) {
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

        this.moveHead(orth.multiplyScalar(this.speed * deltaTime));
    }

    crawlingMovement(deltaTime) {
        if (this.destination == null) {
            this.pickFovDestination();
        }

        let diff = new Vector2().subVectors(this.destination, this.head.pos);

        if (diff.length() < 0.01) {
            this.changeState(this.pickRandomState());
            return;
        }

        this.moveHead(diff.normalize().multiplyScalar(this.speed * deltaTime));
    }

    instantMouseMovement(mousePos) {
        this.moveHead(new Vector2(...Object.values(mousePos)), true);
    }

    mouseMovement(deltaTime, mousePos) {
        // TODO theres local destination here and this.destination.
        // something to keep in mind when I do the refactor

        let destination = new Vector2(...Object.values(mousePos));

        let diff = new Vector2().subVectors(destination, this.head.pos);

        if (diff.length() < 0.01) {
            return;
        }

        this.moveHead(diff.normalize().multiplyScalar(this.speed * deltaTime));
    }
}
