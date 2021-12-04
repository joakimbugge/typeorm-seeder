import { Connection } from 'typeorm';
import { Entity } from '../models/Entity';
import { mutateCascadeInsert } from '../integrations/mutateCascadeInsert';
import { createMany, CreateManyOptions } from './createMany';

export type PersistManyOptions = CreateManyOptions;

export async function persistMany<T>(
  amount: number,
  entity: Entity<T>,
  connection: Connection,
  options?: PersistManyOptions,
): Promise<T[]> {
  const instances = createMany(amount, entity, options);

  mutateCascadeInsert(entity, connection);
  await connection.manager.save(instances);

  return connection.manager.find(entity);
}
