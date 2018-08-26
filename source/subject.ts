/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Observer } from './observer';

/**
 * Generic subject class.
 */
@Class.Describe()
export class Subject<T> {
  /**
   * List of observers.
   */
  @Class.Protected()
  protected observers: Observer<T>[] = [];

  /**
   * Number of registered observers.
   */
  @Class.Public()
  public get length(): number {
    return this.observers.length;
  }

  /**
   * Subscribes the specified source into the subject.
   * @param source Source instance.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public subscribe(source: Observer<T> | Subject<T>): Subject<T> {
    if (source instanceof Subject) {
      for (const observer of source.observers) {
        this.observers.push(observer);
      }
    } else {
      this.observers.push(source);
    }
    return this;
  }

  /**
   * Determines whether the subject contains the specified observer or not.
   * @param observer Observer instance.
   * @returns Returns true when the observer was found, false otherwise.
   */
  @Class.Public()
  public contains(observer: Observer<T>): boolean {
    return this.observers.indexOf(observer) !== -1;
  }

  /**
   * Unsubscribes the specified observer from the subject.
   * @param observer Observer instance.
   * @returns Returns true when the observer was removed, false when the observer does not exists in the subject.
   */
  @Class.Public()
  public unsubscribe(observer: Observer<T>): boolean {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Notify all registered observers.
   * @param value Notification value.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public notifyAllSync(value: T): Subject<T> {
    for (const observer of this.observers) {
      observer(value);
    }
    return this;
  }

  /**
   * Notify all registered observers asynchronously.
   * @param value Notification value.
   * @returns Returns a promise to get the own instance.
   */
  @Class.Public()
  public async notifyAll(value: T): Promise<Subject<T>> {
    for (const observer of this.observers) {
      await observer(value);
    }
    return this;
  }

  /**
   * Notify all registered observers step by step with an iterator.
   * @param value Notification value.
   * @returns Returns a new notification iterator.
   */
  @Class.Public()
  public *notifyStep(value: T): IterableIterator<Subject<T>> {
    for (const observer of this.observers) {
      yield observer(value);
    }
    return this;
  }
}
