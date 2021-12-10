import * as faker from 'faker';
import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../src';
import { persist } from '../../../src/entity/builders/persist';
import { createInMemoryDatabase, removeInMemoryDatabase } from '../../utils/createInMemoryDatabase';
import { DeepEmbedEntityMock } from '../mocks/embeds/DeepEmbedEntityMock';
import { EmbedEntityMock } from '../mocks/embeds/EmbedEntityMock';
import { InheritanceEntityMock } from '../mocks/inheritance/concrete-inheritance/InheritanceEntityMock';
import { SingleInheritanceEntityMock } from '../mocks/inheritance/single-inheritance/SingleInheritanceEntityMock';
import { SingleInheritanceChildEntityMock } from '../mocks/inheritance/single-inheritance/SingleInheritanceChildEntityMock';
import { ManyToManyPrimaryEntityMock } from '../mocks/seeded-relations/many-to-many/ManyToManyPrimaryEntityMock';
import { ManyToManySecondaryEntityMock } from '../mocks/seeded-relations/many-to-many/ManyToManySecondaryEntityMock';
import { ManyToOneChildEntityMock } from '../mocks/seeded-relations/many-to-one/ManyToOneChildEntityMock';
import { ManyToOneParentEntityMock } from '../mocks/seeded-relations/many-to-one/ManyToOneParentEntityMock';
import { OneToOnePrimaryEntityMock } from '../mocks/seeded-relations/one-to-one/OneToOnePrimaryEntityMock';
import { OneToOneSecondaryEntityMock } from '../mocks/seeded-relations/one-to-one/OneToOneSecondaryEntityMock';

describe(persist.name, () => {
  afterEach(() => removeInMemoryDatabase());

  it('returns multiple instances', async () => {
    const connection = await createInMemoryDatabase([EntityMock]);

    await persist(EntityMock, connection);

    const entity = await getRepository(EntityMock).findOne();

    expect(entity).toBeInstanceOf(EntityMock);
  });

  it('returns entity with seeded properties', async () => {
    const connection = await createInMemoryDatabase([EntityMock]);

    await persist(EntityMock, connection);

    const entity = await getRepository(EntityMock).findOne();

    expect(entity?.name).toStrictEqual(expect.any(String));
    expect(entity?.age).toStrictEqual(expect.any(Number));
  });

  describe('with relations', () => {
    it('seeds one-to-one', async () => {
      const connection = await createInMemoryDatabase([
        OneToOnePrimaryEntityMock,
        OneToOneSecondaryEntityMock,
      ]);

      await persist(OneToOnePrimaryEntityMock, connection);

      const entity = await getRepository(OneToOnePrimaryEntityMock).findOne({
        relations: ['sibling'],
      });

      expect(entity?.sibling).toBeInstanceOf(OneToOneSecondaryEntityMock);
    });

    it('seeds many-to-one', async () => {
      const connection = await createInMemoryDatabase([
        ManyToOneParentEntityMock,
        ManyToOneChildEntityMock,
      ]);

      await persist(ManyToOneParentEntityMock, connection);

      const parentEntity = await getRepository(ManyToOneParentEntityMock).findOne({
        relations: ['children'],
      });

      expect(parentEntity?.children).toHaveLength(2);

      parentEntity?.children.forEach((childEntity) => {
        expect(childEntity).toBeInstanceOf(ManyToOneChildEntityMock);
      });
    });

    it('seeds one-to-many', async () => {
      const connection = await createInMemoryDatabase([
        ManyToOneParentEntityMock,
        ManyToOneChildEntityMock,
      ]);

      await persist(ManyToOneChildEntityMock, connection);

      const entity = await getRepository(ManyToOneChildEntityMock).findOne({
        relations: ['parent'],
      });

      expect(entity?.parent).toBeInstanceOf(ManyToOneParentEntityMock);
    });

    it('seeds many-to-many', async () => {
      const connection = await createInMemoryDatabase([
        ManyToManyPrimaryEntityMock,
        ManyToManySecondaryEntityMock,
      ]);

      await persist(ManyToManyPrimaryEntityMock, connection);

      const entity = await getRepository(ManyToManyPrimaryEntityMock).findOne({
        relations: ['siblings'],
      });

      expect(entity?.siblings).toHaveLength(2);

      entity?.siblings.forEach((childEntity) => {
        expect(childEntity).toBeInstanceOf(ManyToManySecondaryEntityMock);
      });
    });
  });

  describe('with embeds', () => {
    it('seeds shallow embed', async () => {
      const connection = await createInMemoryDatabase([EmbedEntityMock]);

      await persist(EmbedEntityMock, connection);

      const entity = await getRepository(EmbedEntityMock).findOne();

      expect(entity?.name.first).toStrictEqual(expect.any(String));
      expect(entity?.name.last).toStrictEqual(expect.any(String));
    });

    it('seeds deep embed', async () => {
      const connection = await createInMemoryDatabase([DeepEmbedEntityMock]);

      await persist(DeepEmbedEntityMock, connection);

      const entity = await getRepository(DeepEmbedEntityMock).findOne();

      expect(entity?.name.other.first).toStrictEqual(expect.any(String));
      expect(entity?.name.other.last).toStrictEqual(expect.any(String));
    });
  });

  describe('with concrete table inheritance', () => {
    it('seeds properties from parent entities', async () => {
      const connection = await createInMemoryDatabase([InheritanceEntityMock]);

      await persist(InheritanceEntityMock, connection);

      const entity = await getRepository(InheritanceEntityMock).findOne();

      expect(entity?.name).toEqual(expect.any(String));
      expect(entity?.address).toEqual(expect.any(String));
      expect(entity?.age).toEqual(expect.any(Number));
    });
  });

  describe('with single table inheritance', () => {
    it('seeds properties from parent entities', async () => {
      const connection = await createInMemoryDatabase([
        SingleInheritanceEntityMock,
        SingleInheritanceChildEntityMock,
      ]);

      await persist(SingleInheritanceChildEntityMock, connection);

      const entity = await getRepository(SingleInheritanceChildEntityMock).findOne();

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
  @Seed(() => faker.name.firstName())
  public name!: string;

  @Column()
  @Seed(() => faker.datatype.number())
  public age!: number;
}
