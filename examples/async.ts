/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the observable package for generic
 * purposes.
 */
import * as Observable from '../source';

/**
 * Create a subject.
 */
const tickEventsA = new Observable.Subject<number>();
const tickEventsB = new Observable.Subject<number>();

/**
 * Subscribe the first observer.
 */
tickEventsA.subscribe(function observerA(count: number): void {
  if (count === 2) {
    tickEventsA.unsubscribe(observerA);
    console.log('Tick A: ', count, ' (final)');
  } else {
    console.log('Tick A: ', count);
  }
});

/**
 * Subscribe the second observer.
 */
tickEventsB.subscribe((count: number) => {
  console.log('Tick B1: ', count);
});

/**
 * Subscribe the third observer.
 */
tickEventsB.subscribe((count: number) => {
  console.log('Tick B2: ', count);
});

/**
 * Notify all observers.
 */
for (let i = 1; i <= 4; ++i) {
  setTimeout(() => tickEventsA.notifyAll(i), i * 1000);
  setTimeout(() => tickEventsB.notifyAll(i), i * 500);
}
