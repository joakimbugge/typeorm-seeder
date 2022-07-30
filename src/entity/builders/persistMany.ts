import { DataSource } from 'typeorm';
import { mutateCascadeInsert } from '../integrations/mutateCascadeInsert';
import { Entity } from '../models/Entity';
import { createMany, CreateManyOptions } from './createMany';

export type PersistManyOptions = CreateManyOptions;

export async function persistMany<T>(
  amount: number,
  entity: Entity<T>,
  dataSource: DataSource,
  options?: PersistManyOptions,
): Promise<T[]> {
  const instances = createMany(amount, entity, options);

  mutateCascadeInsert(entity, dataSource);
  await dataSource.manager.save(instances);

  return dataSource.manager.find(entity);
}
