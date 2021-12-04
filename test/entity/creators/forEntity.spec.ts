import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityConnectionError, forEntity } from '../../../src';
import { createInMemoryDatabase, removeInMemoryDatabase } from '../../utils/createInMemoryDatabase';

describe(forEntity.name, () => {
  afterEach(() => removeInMemoryDatabase());

  it('runs with provided connection', async () => {
    const connection = await createInMemoryDatabase([EntityMock]);
    const persist = () => forEntity(EntityMock, connection).persist();

    await expect(persist()).resolves.toEqual<EntityMock>({
      id: expect.any(Number),
    });
  });

  it('runs with existing connection', async () => {
    await createInMemoryDatabase([EntityMock]);
    const persist = () => forEntity(EntityMock).persist();

    await expect(persist()).resolves.toEqual<EntityMock>({
      id: expect.any(Number),
    });
  });

  it('throws error on missing connection', async () => {
    const persist = () => forEntity(EntityMock).persist();

    await expect(async () => await persist()).rejects.toThrowError(EntityConnectionError);
  });
});

@Entity()
class EntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;
}
