import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityConnectionError } from '../../../src';
import { getConnectionForEntity } from '../../../src/entity/utils/getConnectionForEntity';
import { createInMemoryDatabase, removeInMemoryDatabase } from '../../utils/createInMemoryDatabase';

describe(getConnectionForEntity.name, () => {
  afterEach(() => removeInMemoryDatabase());

  it('returns connection for entity', async () => {
    const connection = await createInMemoryDatabase([EntityMock]);

    expect(getConnectionForEntity(EntityMock)).toEqual(connection);
  });

  it('throws error for missing connection', () => {
    expect(() => getConnectionForEntity(EntityMock)).toThrowError(EntityConnectionError);
  });
});

@Entity()
class EntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;
}
