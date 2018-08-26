"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the observable package for generic
 * purposes.
 */
const Observable = require("../source");
/**
 * Create a subject.
 */
const tickEventsA = new Observable.Subject();
const tickEventsB = new Observable.Subject();
/**
 * Subscribe the first observer.
 */
tickEventsA.subscribe(function observerA(count) {
    if (count === 2) {
        tickEventsA.unsubscribe(observerA);
        console.log(`Tick A: ${count} (final)`);
    }
    else {
        console.log(`Tick A: ${count}`);
    }
});
/**
 * Subscribe the second observer.
 */
tickEventsB.subscribe((count) => {
    console.log(`Tick B1: ${count}`);
});
/**
 * Subscribe the third observer.
 */
tickEventsB.subscribe((count) => {
    console.log(`Tick B2: ${count}`);
});
/**
 * Notify all observers.
 */
console.log(`Notify all: ${tickEventsA.length + tickEventsB.length}`);
for (let i = 1; i <= 4; ++i) {
    setTimeout(() => tickEventsA.notifyAll(i), i * 1000);
    setTimeout(() => tickEventsB.notifyAll(i), i * 500);
}
