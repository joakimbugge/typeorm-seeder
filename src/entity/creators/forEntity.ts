import { Connection } from 'typeorm';
import { create } from '../builders/create';
import { createMany } from '../builders/createMany';
import { persist } from '../builders/persist';
import { persistMany } from '../builders/persistMany';
import { Entity } from '../models/Entity';
import { getConnectionForEntity } from '../utils/getConnectionForEntity';

export interface EntityCreator<T> {
  create(): T;
  createMany(amount: number): T[];
  persist(): Promise<T>;
  persistMany(amount: number): Promise<T[]>;
}

export function forEntity<T>(entity: Entity<T>, connection?: Connection): EntityCreator<T> {
  return {
    create() {
      return create(entity);
    },
    createMany(amount) {
      return createMany(amount, entity);
    },
    persist() {
      const conn = connection || getConnectionForEntity(entity);
      return persist(entity, conn);
    },
    persistMany(amount) {
      const conn = connection || getConnectionForEntity(entity);
      return persistMany(amount, entity, conn);
    },
  };
}
