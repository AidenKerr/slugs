import './style.css';
import { render } from './render';
import { Slug } from './slugs';

let slugs = [
    new Slug([[[0.0, 0.0], 0.5]]),
    new Slug([[[0.75, 0.0], 0.25]]),
    new Slug([[[-0.25, 0.8], 0.25]]),
];

render(slugs);
