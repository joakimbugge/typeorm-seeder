import { randFirstName, randNumber } from '@ngneat/falso';
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../src';
import { persist } from '../../../src/entity/builders/persist';
import {
  createInMemoryDataSource,
  removeInMemoryDatabase,
} from '../../utils/createInMemoryDataSource';
import { DeepEmbedEntityMock } from '../mocks/embeds/DeepEmbedEntityMock';
import { EmbedEntityMock } from '../mocks/embeds/EmbedEntityMock';
import { InheritanceEntityMock } from '../mocks/inheritance/concrete-inheritance/InheritanceEntityMock';
import { SingleInheritanceChildEntityMock } from '../mocks/inheritance/single-inheritance/SingleInheritanceChildEntityMock';
import { SingleInheritanceEntityMock } from '../mocks/inheritance/single-inheritance/SingleInheritanceEntityMock';
import { ManyToManyPrimaryEntityMock } from '../mocks/seeded-relations/many-to-many/ManyToManyPrimaryEntityMock';
import { ManyToManySecondaryEntityMock } from '../mocks/seeded-relations/many-to-many/ManyToManySecondaryEntityMock';
import { ManyToOneChildEntityMock } from '../mocks/seeded-relations/many-to-one/ManyToOneChildEntityMock';
import { ManyToOneParentEntityMock } from '../mocks/seeded-relations/many-to-one/ManyToOneParentEntityMock';
import { OneToOnePrimaryEntityMock } from '../mocks/seeded-relations/one-to-one/OneToOnePrimaryEntityMock';
import { OneToOneSecondaryEntityMock } from '../mocks/seeded-relations/one-to-one/OneToOneSecondaryEntityMock';

describe(persist.name, () => {
  let dataSource: DataSource;

  afterEach(() => removeInMemoryDatabase(dataSource));

  it('returns multiple instances', async () => {
    dataSource = await createInMemoryDataSource([EntityMock]);

    await persist(EntityMock, dataSource);

    const [entity] = await dataSource.getRepository(EntityMock).find();

    expect(entity).toBeInstanceOf(EntityMock);
  });

  it('returns entity with seeded properties', async () => {
    dataSource = await createInMemoryDataSource([EntityMock]);

    await persist(EntityMock, dataSource);

    const [entity] = await dataSource.getRepository(EntityMock).find();

    expect(entity?.name).toStrictEqual(expect.any(String));
    expect(entity?.age).toStrictEqual(expect.any(Number));
  });

  describe('with relations', () => {
    it('seeds one-to-one', async () => {
      dataSource = await createInMemoryDataSource([
        OneToOnePrimaryEntityMock,
        OneToOneSecondaryEntityMock,
      ]);

      await persist(OneToOnePrimaryEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(OneToOnePrimaryEntityMock).find({
        relations: {
          sibling: true,
        },
      });

      expect(entity?.sibling).toBeInstanceOf(OneToOneSecondaryEntityMock);
    });

    it('seeds many-to-one', async () => {
      dataSource = await createInMemoryDataSource([
        ManyToOneParentEntityMock,
        ManyToOneChildEntityMock,
      ]);

      await persist(ManyToOneParentEntityMock, dataSource);

      const [parentEntity] = await dataSource.getRepository(ManyToOneParentEntityMock).find({
        relations: {
          children: true,
        },
      });

      expect(parentEntity?.children).toHaveLength(2);

      parentEntity?.children.forEach((childEntity) => {
        expect(childEntity).toBeInstanceOf(ManyToOneChildEntityMock);
      });
    });

    it('seeds one-to-many', async () => {
      dataSource = await createInMemoryDataSource([
        ManyToOneParentEntityMock,
        ManyToOneChildEntityMock,
      ]);

      await persist(ManyToOneChildEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(ManyToOneChildEntityMock).find({
        relations: {
          parent: true,
        },
      });

      expect(entity?.parent).toBeInstanceOf(ManyToOneParentEntityMock);
    });

    it('seeds many-to-many', async () => {
      dataSource = await createInMemoryDataSource([
        ManyToManyPrimaryEntityMock,
        ManyToManySecondaryEntityMock,
      ]);

      await persist(ManyToManyPrimaryEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(ManyToManyPrimaryEntityMock).find({
        relations: {
          siblings: true,
        },
      });

      expect(entity?.siblings).toHaveLength(2);

      entity?.siblings.forEach((childEntity) => {
        expect(childEntity).toBeInstanceOf(ManyToManySecondaryEntityMock);
      });
    });
  });

  describe('with embeds', () => {
    it('seeds shallow embed', async () => {
      dataSource = await createInMemoryDataSource([EmbedEntityMock]);

      await persist(EmbedEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(EmbedEntityMock).find();

      expect(entity?.name.first).toStrictEqual(expect.any(String));
      expect(entity?.name.last).toStrictEqual(expect.any(String));
    });

    it('seeds deep embed', async () => {
      dataSource = await createInMemoryDataSource([DeepEmbedEntityMock]);

      await persist(DeepEmbedEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(DeepEmbedEntityMock).find();

      expect(entity?.name.other.first).toStrictEqual(expect.any(String));
      expect(entity?.name.other.last).toStrictEqual(expect.any(String));
    });
  });

  describe('with concrete table inheritance', () => {
    it('seeds properties from parent entities', async () => {
      dataSource = await createInMemoryDataSource([InheritanceEntityMock]);

      await persist(InheritanceEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(InheritanceEntityMock).find();

      expect(entity?.name).toEqual(expect.any(String));
      expect(entity?.address).toEqual(expect.any(String));
      expect(entity?.age).toEqual(expect.any(Number));
    });
  });

  describe('with single table inheritance', () => {
    it('seeds properties from parent entities', async () => {
      dataSource = await createInMemoryDataSource([
        SingleInheritanceEntityMock,
        SingleInheritanceChildEntityMock,
      ]);

      await persist(SingleInheritanceChildEntityMock, dataSource);

      const [entity] = await dataSource.getRepository(SingleInheritanceChildEntityMock).find();

      expect(entity?.name).toEqual(expect.any(String));
      expect(entity?.age).toEqual(expect.any(Number));
    });
  });
});

@Entity()
class EntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(randFirstName)
  public name!: string;

  @Column()
  @Seed(randNumber)
  public age!: number;
}
