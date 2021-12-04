import { Entity } from '../models/Entity';
import { createMany, CreateManyOptions } from './createMany';

export type CreateOptions = CreateManyOptions;

export function create<T>(entity: Entity<T>, options?: CreateOptions): T {
  const [instance] = createMany(1, entity, options);
  return instance;
}
