import { Vector2 } from 'three';

class circle {
    constructor(pos, radius) {
        this.pos = new Vector2(...pos);
        this.radius = radius;
    }
}

export class Slug {
    // TODO more elegant clamping
    minPos = new Vector2(-1.0, -1.0);
    maxPos = new Vector2(1.0, 1.0);

    turnRadius = 1.0;

    movement = {
        start: new Vector2(),
        destination: new Vector2(),
        t: 0,
    };

    // eventually, this could be a list of radius and a direction
    // can build spine using fixed displacements
    constructor(spine, destination) {
        this.spine = spine.map((v) => new circle(...v));
        // TODO initialize movement
        this.movement.start = this.spine[0].pos;
        this.movement.destination = new Vector2(...destination);
        this.movement.midpoint = new Vector2()
            .addVectors(this.movement.start, this.movement.destination)
            .multiplyScalar(0.5);
    }

    findNewDestination() {
        // TODO movement is strange and needs work
        // slugs often getting stuck

        const headPos = this.spine[0].pos;
        this.movement.start = headPos;

        // TODO handle size = 1 ?
        let dir = new Vector2()
            .subVectors(headPos, this.spine[1].pos)
            .normalize();

        let newDestination = new Vector2(
            Math.random() * 2.0 - 1.0,
            Math.random() * 2.0 - 1.0
        );

        const diff = new Vector2().subVectors(newDestination, headPos);
        const cosAngle = new Vector2().copy(diff).normalize().dot(dir);

        console.log(diff.length());

        if (cosAngle < 0.0) {
            return;
        }

        this.movement.destination = newDestination;

        // find midpoint
        const perpDir = new Vector2(-dir.y, dir.x);
        const linePoint = new Vector2()
            .add(headPos)
            .add(dir.multiplyScalar(this.turnRadius));
        const lineDiff = new Vector2().subVectors(newDestination, linePoint);
        const projLen = lineDiff.dot(perpDir);
        this.movement.midpoint = perpDir.multiplyScalar(projLen).add(linePoint);

        this.movement.t = 0.0;
    }

    updateSpine() {
        if (this.movement.t === 1.0) {
            this.findNewDestination();
            return;
        }

        // update t
        this.movement.t += 0.01;
        this.movement.t = Math.min(this.movement.t, 1.0);
        const t = this.movement.t;

        // lerp to destination position
        const start = new Vector2().copy(this.movement.start);
        const midpoint = new Vector2().copy(this.movement.midpoint);
        const destination = new Vector2().copy(this.movement.destination);

        const p0 = start.multiplyScalar(1 - t).add(midpoint.multiplyScalar(t));
        const p1 = midpoint
            .multiplyScalar(1 - t)
            .add(destination.multiplyScalar(t));
        this.spine[0].pos = p0.multiplyScalar(1 - t).add(p1.multiplyScalar(t));

        // update next circles

        for (let i = 1; i < this.spine.length; i++) {
            let separation = 0.35;

            let anchor = this.spine[i - 1].pos;
            let current = this.spine[i].pos;
            let diff = new Vector2()
                .subVectors(current, anchor)
                .setLength(separation);
            this.spine[i].pos = diff.add(anchor);
        }
    }
}
