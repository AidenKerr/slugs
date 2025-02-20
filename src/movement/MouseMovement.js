import { Vector2 } from 'three';

export class MouseMovement {
    mousePos = {
        x: 0,
        y: 0,
    };

    constructor(slug, speed = 'INSTANT') {
        this.slug = slug;
        this.speed = speed;

        // TODO eventually make mouse pos singleton? or something like that
        document.onmousemove = (e) =>
            this.updateMouse(e, {
                x: e.pageX,
                y: e.pageY,
            });
        document.addEventListener('touchmove', (e) =>
            this.updateMouse(e, {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            })
        );
    }

    updateMouse(e, pos) {
        e.preventDefault();
        this.mousePos.x =
            ((pos.x / window.innerWidth) * 2 - 1) *
            (window.innerWidth / window.innerHeight);
        this.mousePos.y = -(pos.y / window.innerHeight) * 2 + 1;
    }

    update(deltaTime, clock) {
        if (this.speed === 'INSTANT') {
            return this.handleInstantMovement();
        }
        return this.handleSlowMovement(deltaTime);
    }

    handleInstantMovement() {
        return [new Vector2(...Object.values(this.mousePos)), true];
    }

    handleSlowMovement(deltaTime) {
        let destination = new Vector2(...Object.values(this.mousePos));
        let diff = new Vector2().subVectors(destination, this.slug.head.pos);
        if (diff.length() < 0.01) {
            return [new Vector2(0, 0)];
        }

        return [diff.normalize().multiplyScalar(this.speed * deltaTime)];
    }
}
