import { DataSource } from 'typeorm';
import { Entity } from '../models/Entity';
import { CreateManyOptions } from './createMany';
import { persistMany } from './persistMany';

export type PersistOptions = CreateManyOptions;

export async function persist<T>(
  entity: Entity<T>,
  dataSource: DataSource,
  options?: PersistOptions,
): Promise<T> {
  const [instance] = await persistMany(1, entity, dataSource, options);
  return instance;
}
