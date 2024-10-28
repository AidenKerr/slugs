import './style.css';
import { render } from './render';
import { Slug } from './slugs';

let slugs = [
    new Slug(
        [
            [[0.2, -0.5], 0.2],
            [[-0.45, -0.5], 0.1],
            [[-0.7, -0.5], 0.13],
        ],
        [0.9, 0.6]
    ),
    new Slug(
        [
            [[0.8, -0.3], 0.2],
            [[0.9, -1.3], 0.1],
            [[0.1, -1.3], 0.13],
        ],
        [-0.9, 0.3]
    ),
];

render(slugs);
