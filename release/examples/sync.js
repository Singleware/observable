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
const tickEvents = new Observable.Subject();
/**
 * Subscribe the first observer.
 */
tickEvents.subscribe(function observerA(count) {
    if (count === 1) {
        tickEvents.unsubscribe(observerA);
        console.log('Tick A: ', count, ' (final)');
    }
    else {
        console.log('Tick A: ', count);
    }
});
/**
 * Subscribe the second observer.
 */
tickEvents.subscribe((count) => {
    console.log('Tick B: ', count);
});
/**
 * Notify all observers.
 */
for (let i = 0; i < 4; ++i) {
    tickEvents.notifyAll(i);
}
