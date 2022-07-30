import { randNumber } from '@ngneat/falso';
import * as crypto from 'crypto';
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../src';
import { persistMany } from '../../../src/entity/builders/persistMany';
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

describe(persistMany.name, () => {
  let dataSource: DataSource;

  afterEach(() => removeInMemoryDatabase(dataSource));

  it('returns multiple instances', async () => {
    const ENTITY_COUNT = 2;
    dataSource = await createInMemoryDataSource([EntityMock]);

    await persistMany(ENTITY_COUNT, EntityMock, dataSource);

    const entities = await dataSource.getRepository(EntityMock).find();

    expect(entities).toHaveLength(ENTITY_COUNT);

    entities.forEach((entity) => {
      expect(entity).toBeInstanceOf(EntityMock);
    });
  });

  it('returns entities with seeded properties', async () => {
    dataSource = await createInMemoryDataSource([EntityMock]);

    await persistMany(2, EntityMock, dataSource);

    const entities = await dataSource.getRepository(EntityMock).find();

    entities.forEach((entity) => {
      expect(entity.name).toStrictEqual(expect.any(String));
      expect(entity.age).toStrictEqual(expect.any(Number));
    });
  });

  it('returns unequal entities', async () => {
    dataSource = await createInMemoryDataSource([EntityMock]);

    await persistMany(2, EntityMock, dataSource);

    const entities = await dataSource.getRepository(EntityMock).find();
    const [firstEntity, secondEntity] = entities;

    expect(firstEntity.name).not.toStrictEqual(secondEntity.name);
    expect(firstEntity.age).not.toStrictEqual(secondEntity.age);
  });

  describe('with relations', () => {
    it('seeds one-to-one', async () => {
      dataSource = await createInMemoryDataSource([
        OneToOnePrimaryEntityMock,
        OneToOneSecondaryEntityMock,
      ]);

      await persistMany(2, OneToOnePrimaryEntityMock, dataSource);

      const entities = await dataSource.getRepository(OneToOnePrimaryEntityMock).find({
        relations: {
          sibling: true,
        },
      });

      entities.forEach((entity) => {
        expect(entity.sibling).toBeInstanceOf(OneToOneSecondaryEntityMock);
      });
    });

    it('seeds many-to-one', async () => {
      dataSource = await createInMemoryDataSource([
        ManyToOneParentEntityMock,
        ManyToOneChildEntityMock,
      ]);

      await persistMany(2, ManyToOneParentEntityMock, dataSource);

      const parentEntities = await dataSource.getRepository(ManyToOneParentEntityMock).find({
        relations: {
          children: true,
        },
      });

      parentEntities.forEach((parentEntity) => {
        expect(parentEntity.children).toHaveLength(2);

        parentEntity.children.forEach((childEntity) => {
          expect(childEntity).toBeInstanceOf(ManyToOneChildEntityMock);
        });
      });
    });

    it('seeds one-to-many', async () => {
      dataSource = await createInMemoryDataSource([
        ManyToOneParentEntityMock,
        ManyToOneChildEntityMock,
      ]);

      await persistMany(2, ManyToOneChildEntityMock, dataSource);

      const childEntities = await dataSource.getRepository(ManyToOneChildEntityMock).find({
        relations: {
          parent: true,
        },
      });

      childEntities.forEach((childEntity) => {
        expect(childEntity.parent).toBeInstanceOf(ManyToOneParentEntityMock);
      });
    });

    it('seeds many-to-many', async () => {
      dataSource = await createInMemoryDataSource([
        ManyToManyPrimaryEntityMock,
        ManyToManySecondaryEntityMock,
      ]);

      await persistMany(2, ManyToManyPrimaryEntityMock, dataSource);

      const entities = await dataSource.getRepository(ManyToManyPrimaryEntityMock).find({
        relations: {
          siblings: true,
        },
      });

      entities.forEach((entity) => {
        expect(entity.siblings).toHaveLength(2);

        entity.siblings.forEach((childEntity) => {
          expect(childEntity).toBeInstanceOf(ManyToManySecondaryEntityMock);
        });
      });
    });
  });

  describe('with embeds', () => {
    it('seeds unequal shallow embed', async () => {
      dataSource = await createInMemoryDataSource([EmbedEntityMock]);

      await persistMany(2, EmbedEntityMock, dataSource);

      const [firstEntity, secondEntity] = await dataSource.getRepository(EmbedEntityMock).find();

      expect(firstEntity.name.first).not.toEqual(secondEntity.name.first);
      expect(firstEntity.name.last).not.toEqual(secondEntity.name.last);
    });

    it('seeds unequal deep embed', async () => {
      dataSource = await createInMemoryDataSource([DeepEmbedEntityMock]);

      await persistMany(2, DeepEmbedEntityMock, dataSource);

      const [firstEntity, secondEntity] = await dataSource
        .getRepository(DeepEmbedEntityMock)
        .find();

      expect(firstEntity.name.other.first).not.toEqual(secondEntity.name.other.first);
      expect(firstEntity.name.other.last).not.toEqual(secondEntity.name.other.last);
    });
  });

  describe('with concrete table inheritance', () => {
    it('seeds unequal properties from parent entities', async () => {
      dataSource = await createInMemoryDataSource([InheritanceEntityMock]);

      await persistMany(2, InheritanceEntityMock, dataSource);

      const [firstEntity, secondEntity] = await dataSource
        .getRepository(InheritanceEntityMock)
        .find();

      expect(firstEntity.name).not.toEqual(secondEntity.name);
      expect(firstEntity.address).not.toEqual(secondEntity.address);
      expect(firstEntity.age).not.toEqual(secondEntity.age);
    });
  });

  describe('with single table inheritance', () => {
    it('seeds unequal properties from parent entities', async () => {
      dataSource = await createInMemoryDataSource([
        SingleInheritanceEntityMock,
        SingleInheritanceChildEntityMock,
      ]);

      await persistMany(2, SingleInheritanceChildEntityMock, dataSource);

      const [firstEntity, secondEntity] = await dataSource
        .getRepository(SingleInheritanceChildEntityMock)
        .find();

      expect(firstEntity.name).not.toEqual(secondEntity.name);
      expect(firstEntity.age).not.toEqual(secondEntity.age);
    });
  });
});

@Entity()
class EntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => crypto.randomUUID())
  public name!: string;

  @Column()
  @Seed(randNumber)
  public age!: number;
}
