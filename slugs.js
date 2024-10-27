class circle {
    constructor(pos, radius) {
        this.pos = pos;
        this.radius = radius;
    }
}

export class Slug {
    constructor() {
        this.spine = [new circle([1, 1, 1], 1)];
    }
}
