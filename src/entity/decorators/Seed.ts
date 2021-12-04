import { isFunction, merge } from 'lodash';
import 'reflect-metadata';
import { Entity } from '../models/Entity';
import { SeedStore } from '../stores/SeedStore';

export type SeedCallback<R = unknown> = () => R;

export interface SeedOptions {
  amount?: number;
}

export function Seed(): PropertyDecorator;
export function Seed<R = unknown>(callback: SeedCallback<R>): PropertyDecorator;
export function Seed(options: SeedOptions): PropertyDecorator;

export function Seed<T extends Entity, R = unknown>(
  callback?: SeedCallback<R> | SeedOptions,
  options?: SeedOptions,
): PropertyDecorator {
  const opts = merge({}, isFunction(callback) ? options : callback);
  const getValue = isFunction(callback) ? callback : getEmptyCallback();

  return function (target: any, propertyKey: string | symbol) {
    SeedStore.set(<T>target.constructor, <keyof T>propertyKey, {
      callback: getValue,
      options: opts,
    });
  };
}

function getEmptyCallback(): () => void {
  return () => {
    // pass
  };
}
