import { DataSource } from 'typeorm';
import { create } from '../builders/create';
import { createMany } from '../builders/createMany';
import { persist } from '../builders/persist';
import { persistMany } from '../builders/persistMany';
import { Entity } from '../models/Entity';

export interface EntityCreator<T> {
  create(): T;
  createMany(amount: number): T[];
  persist(): Promise<T>;
  persistMany(amount: number): Promise<T[]>;
}

export function forEntity<T>(entity: Entity<T>, dataSource: DataSource): EntityCreator<T> {
  return {
    create() {
      return create(entity);
    },
    createMany(amount) {
      return createMany(amount, entity);
    },
    persist() {
      return persist(entity, dataSource);
    },
    persistMany(amount) {
      return persistMany(amount, entity, dataSource);
    },
  };
}
