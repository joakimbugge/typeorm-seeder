import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityConnectionError, forEntity } from '../../../src';
import { createInMemoryDatabase, removeInMemoryDatabase } from '../../utils/createInMemoryDatabase';
import * as create from '../../../src/entity/builders/create';
import * as createMany from '../../../src/entity/builders/createMany';
import * as persist from '../../../src/entity/builders/persist';
import * as persistMany from '../../../src/entity/builders/persistMany';

describe(forEntity.name, () => {
  afterEach(() => {
    removeInMemoryDatabase();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('calls create()', async () => {
      const spy = jest.spyOn(create, 'create');
      const connection = await createInMemoryDatabase([EntityMock]);

      forEntity(EntityMock, connection).create();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(EntityMock);
    });
  });

  describe('createMany', () => {
    it('calls createMany()', async () => {
      const spy = jest.spyOn(createMany, 'createMany');
      const connection = await createInMemoryDatabase([EntityMock]);

      forEntity(EntityMock, connection).createMany(2);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(2);
      expect(spy.mock.calls[0][1]).toEqual(EntityMock);
    });
  });

  describe('persist', () => {
    it('calls persist()', async () => {
      const spy = jest.spyOn(persist, 'persist');
      const connection = await createInMemoryDatabase([EntityMock]);

      await forEntity(EntityMock, connection).persist();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(EntityMock);
      expect(spy.mock.calls[0][1]).toEqual(connection);
    });

    it('throws error on missing connection', async () => {
      const persist = () => forEntity(EntityMock).persist();

      await expect(async () => await persist()).rejects.toThrowError(EntityConnectionError);
    });
  });

  describe('persistMany', () => {
    it('calls persistMany()', async () => {
      const spy = jest.spyOn(persistMany, 'persistMany');
      const connection = await createInMemoryDatabase([EntityMock]);

      await forEntity(EntityMock, connection).persistMany(2);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(2);
      expect(spy.mock.calls[0][1]).toEqual(EntityMock);
      expect(spy.mock.calls[0][2]).toEqual(connection);
    });

    it('throws error on missing connection', async () => {
      const persistMany = () => forEntity(EntityMock).persistMany(2);

      await expect(async () => await persistMany()).rejects.toThrowError(EntityConnectionError);
    });
  });
});

@Entity()
class EntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;
}
