import { Vector2 } from 'three';
import { MouseMovement } from './MouseMovement';
import { CrawlMovement } from './CrawlMovement';
import { ScanMovement } from './ScanMovement';

export class SlugMovement {
    // TODO implement: I noticed that by picking destinations to the front left/right you get a crawling motion. its fun. Not the crawl currently implemented

    constructor(slug, speed, strategy) {
        this.slug = slug;
        this.speed = speed;
        this.changeStrategy(strategy);
        this.destination == null;
        this.queuedMovement = null;
    }

    changeStrategy(strategy) {
        // handle interupted queued movements
        clearTimeout(this.queuedMovement);

        this.strategy = strategy;

        if (strategy instanceof MouseMovement) return;

        // timeout for state change (this can be refactored to be events based, maybe?)
        // TODO if refactored to add events, be sure to cancel any timeouts
        const min = 3000;
        const max = 5000;
        const delay = Math.random() * (max - min) + min;
        const nextStrategy = this.pickRandomStrategy();

        this.queuedMovement = setTimeout(
            () => this.changeStrategy(nextStrategy),
            delay
        );
    }

    pickRandomStrategy() {
        // TODO make random
        return this.strategy instanceof CrawlMovement
            ? new ScanMovement(this.slug, this.speed)
            : new CrawlMovement(this.slug, this.speed);
    }

    update(deltaTime, clock) {
        // the movement strategy will tell me if we need to pick a new state
        const updateState = this.strategy.update(deltaTime, clock);
        this.updateSpine();

        // this is just a direction to pick a new random state.
        // Not the best solution to this problem (TODO)
        // maybe can be improved when we add events-based strategy changes?
        if (updateState) {
            this.changeStrategy(this.pickRandomStrategy());
        }
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
}
