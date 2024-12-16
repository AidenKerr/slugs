import './style.css';
import { render } from './render';
import { Slug } from './slugs';

let slugs = [
    new Slug(
        [
            [[1.0, 0.0], 0.12],
            [[-0.45, -0.5], 0.005],
            [[-0.7, -0.5], 0.05],
            [[-0.7, -0.5], 0.03],
            [[-0.7, -0.5], 0.03],
        ]
        // true
    ),
    // new Slug([
    //     [[0.0, 0.0], 0.12],
    //     [[1.45, -0.5], 0.005],
    //     [[1.7, -0.5], 0.05],
    //     [[1.7, -0.5], 0.03],
    //     [[1.7, -0.5], 0.03],
    // ]),
    // new Slug([
    //     [[0.0, 0.0], 0.12],
    //     [[1.45, -0.5], 0.005],
    //     [[1.7, -0.5], 0.05],
    //     [[1.7, -0.5], 0.03],
    //     [[1.7, -0.5], 0.03],
    // ]),
    // new Slug([
    //     [[0.2, -0.5], 0.1],
    //     [[-0.45, -0.5], 0.005],
    //     [[-0.7, -0.5], 0.05],
    // ]),
    // new Slug([
    //     [[0.8, -0.3], 0.1],
    //     [[0.9, -1.3], 0.005],
    //     [[0.1, -1.3], 0.05],
    // ]),
    // new Slug([
    //     [[0.0, -0.0], 0.1],
    //     [[0.0, -1.0], 0.005],
    //     [[0.0, -1.0], 0.05],
    // ]),
];

let mousePos = {
    x: 0,
    y: 0,
};
document.onmousemove = function (e) {
    mousePos.x =
        ((e.pageX / window.innerWidth) * 2 - 1) *
        (window.innerWidth / window.innerHeight);
    mousePos.y = -(e.pageY / window.innerHeight) * 2 + 1;
};

render(slugs, mousePos);
