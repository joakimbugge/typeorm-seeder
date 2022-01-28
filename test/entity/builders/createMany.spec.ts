import { randFirstName, randNumber } from '@ngneat/falso';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../src';
import { createMany } from '../../../src/entity/builders/createMany';
import { removeInMemoryDatabase } from '../../utils/createInMemoryDatabase';
import { DeepEmbedEntityMock } from '../mocks/embeds/DeepEmbedEntityMock';
import { EmbedEntityMock } from '../mocks/embeds/EmbedEntityMock';
import { InheritanceEntityMock } from '../mocks/inheritance/concrete-inheritance/InheritanceEntityMock';
import { SingleInheritanceChildEntityMock } from '../mocks/inheritance/single-inheritance/SingleInheritanceChildEntityMock';
import { ManyToManyPrimaryEntityMock } from '../mocks/seeded-relations/many-to-many/ManyToManyPrimaryEntityMock';
import { ManyToManySecondaryEntityMock } from '../mocks/seeded-relations/many-to-many/ManyToManySecondaryEntityMock';
import { ManyToOneChildEntityMock } from '../mocks/seeded-relations/many-to-one/ManyToOneChildEntityMock';
import { ManyToOneParentEntityMock } from '../mocks/seeded-relations/many-to-one/ManyToOneParentEntityMock';
import { OneToOnePrimaryEntityMock } from '../mocks/seeded-relations/one-to-one/OneToOnePrimaryEntityMock';
import { OneToOneSecondaryEntityMock } from '../mocks/seeded-relations/one-to-one/OneToOneSecondaryEntityMock';

describe(createMany.name, () => {
  afterEach(() => removeInMemoryDatabase());

  it('returns multiple instances', () => {
    const ENTITY_COUNT = 2;
    const entities = createMany(ENTITY_COUNT, EntityMock);

    expect(entities).toHaveLength(ENTITY_COUNT);

    entities.forEach((entity) => {
      expect(entity).toBeInstanceOf(EntityMock);
    });
  });

  it('returns entities with seeded properties', () => {
    const entities = createMany(2, EntityMock);

    entities.forEach((entity) => {
      expect(entity.name).toStrictEqual(expect.any(String));
      expect(entity.age).toStrictEqual(expect.any(Number));
    });
  });

  it('returns unequal entities', () => {
    const entities = createMany(2, EntityMock);
    const [firstEntity, secondEntity] = entities;

    expect(firstEntity.name).not.toStrictEqual(secondEntity.name);
    expect(firstEntity.age).not.toStrictEqual(secondEntity.age);
  });

  describe('with relations', () => {
    it('seeds one-to-one', () => {
      const entities = createMany(2, OneToOnePrimaryEntityMock);

      entities.forEach((entity) => {
        expect(entity.sibling).toBeInstanceOf(OneToOneSecondaryEntityMock);
      });
    });

    it('seeds many-to-one', () => {
      const parentEntities = createMany(2, ManyToOneParentEntityMock);

      parentEntities.forEach((parentEntity) => {
        expect(parentEntity.children).toHaveLength(2);

        parentEntity.children.forEach((childEntity) => {
          expect(childEntity).toBeInstanceOf(ManyToOneChildEntityMock);
        });
      });
    });

    it('seeds one-to-many', () => {
      const childEntities = createMany(2, ManyToOneChildEntityMock);

      childEntities.forEach((childEntity) => {
        expect(childEntity.parent).toBeInstanceOf(ManyToOneParentEntityMock);
      });
    });

    it('seeds many-to-many', () => {
      const entities = createMany(2, ManyToManyPrimaryEntityMock);

      entities.forEach((entity) => {
        expect(entity.siblings).toHaveLength(2);

        entity.siblings.forEach((childEntity) => {
          expect(childEntity).toBeInstanceOf(ManyToManySecondaryEntityMock);
        });
      });
    });
  });

  describe('with embeds', () => {
    it('seeds unequal shallow embed', () => {
      const entities = createMany(2, EmbedEntityMock);
      const [firstEntity, secondEntity] = entities;

      expect(firstEntity.name.first).not.toEqual(secondEntity.name.first);
      expect(firstEntity.name.last).not.toEqual(secondEntity.name.last);
    });

    it('seeds unequal deep embed', () => {
      const entities = createMany(2, DeepEmbedEntityMock);
      const [firstEntity, secondEntity] = entities;

      expect(firstEntity.name.other.first).not.toEqual(secondEntity.name.other.first);
      expect(firstEntity.name.other.last).not.toEqual(secondEntity.name.other.last);
    });
  });

  describe('with concrete table inheritance', () => {
    it('seeds unequal properties from parent entities', () => {
      const entities = createMany(2, InheritanceEntityMock);
      const [firstEntity, secondEntity] = entities;

      expect(firstEntity.name).not.toEqual(secondEntity.name);
      expect(firstEntity.address).not.toEqual(secondEntity.address);
      expect(firstEntity.age).not.toEqual(secondEntity.age);
    });
  });

  describe('with single table inheritance', () => {
    it('seeds unequal properties from parent entities', () => {
      const entities = createMany(2, SingleInheritanceChildEntityMock);
      const [firstEntity, secondEntity] = entities;

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
  @Seed(randFirstName)
  public name!: string;

  @Column()
  @Seed(randNumber)
  public age!: number;
}
