import { Connection, createConnection, getConnection } from 'typeorm';
import { Entity } from '../../src';

export function createInMemoryDatabase(entities: Entity[]): Promise<Connection> {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
  });
}

export async function removeInMemoryDatabase(): Promise<void> {
  try {
    await getConnection().close();
  } catch {
    // pass
  }
}
