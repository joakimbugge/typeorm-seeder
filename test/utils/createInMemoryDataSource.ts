import { DataSource } from 'typeorm';
import { Entity } from '../../src';

export function createInMemoryDataSource(entities: Entity[]): Promise<DataSource> {
  return new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
  }).initialize();
}

export async function removeInMemoryDatabase(dataSource: DataSource): Promise<void> {
  try {
    await dataSource.destroy();
  } catch {
    // pass
  }
}
