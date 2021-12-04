import { Connection } from 'typeorm';
import { Entity } from '../models/Entity';
import { CreateManyOptions } from './createMany';
import { persistMany } from './persistMany';

export type PersistOptions = CreateManyOptions;

export async function persist<T>(
  entity: Entity<T>,
  connection: Connection,
  options?: PersistOptions,
): Promise<T> {
  const [instance] = await persistMany(1, entity, connection, options);
  return instance;
}
