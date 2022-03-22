import { DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { forEntity } from '../../../src';
import * as create from '../../../src/entity/builders/create';
import * as createMany from '../../../src/entity/builders/createMany';
import * as persist from '../../../src/entity/builders/persist';
import * as persistMany from '../../../src/entity/builders/persistMany';
import {
  createInMemoryDataSource,
  removeInMemoryDatabase,
} from '../../utils/createInMemoryDataSource';

describe(forEntity.name, () => {
  let dataSource: DataSource;

  afterEach(() => {
    removeInMemoryDatabase(dataSource);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('calls create()', async () => {
      const spy = jest.spyOn(create, 'create');
      dataSource = await createInMemoryDataSource([EntityMock]);

      forEntity(EntityMock, dataSource).create();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(EntityMock);
    });
  });

  describe('createMany', () => {
    it('calls createMany()', async () => {
      const spy = jest.spyOn(createMany, 'createMany');
      dataSource = await createInMemoryDataSource([EntityMock]);

      forEntity(EntityMock, dataSource).createMany(2);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(2);
      expect(spy.mock.calls[0][1]).toEqual(EntityMock);
    });
  });

  describe('persist', () => {
    it('calls persist()', async () => {
      const spy = jest.spyOn(persist, 'persist');
      dataSource = await createInMemoryDataSource([EntityMock]);

      await forEntity(EntityMock, dataSource).persist();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(EntityMock);
      expect(spy.mock.calls[0][1]).toEqual(dataSource);
    });
  });

  describe('persistMany', () => {
    it('calls persistMany()', async () => {
      const spy = jest.spyOn(persistMany, 'persistMany');
      dataSource = await createInMemoryDataSource([EntityMock]);

      await forEntity(EntityMock, dataSource).persistMany(2);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(2);
      expect(spy.mock.calls[0][1]).toEqual(EntityMock);
      expect(spy.mock.calls[0][2]).toEqual(dataSource);
    });
  });
});

@Entity()
class EntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;
}
