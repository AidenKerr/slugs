import { Vector2 } from 'three';

class circle {
    constructor(pos, radius) {
        this.pos = new Vector2(...pos);
        this.radius = radius;
    }
}

export class Slug {
    // eventually, this could be a list of radius and a direction
    // can build spine using fixed displacements
    constructor(spine) {
        this.spine = spine.map((v) => new circle(...v));
    }
}
