import { randFirstName, randNumber } from '@ngneat/falso';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../src';
import { create } from '../../../src/entity/builders/create';
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

describe(create.name, () => {
  afterEach(() => removeInMemoryDatabase());

  it('returns multiple instances', () => {
    const entity = create(EntityMock);

    expect(entity).toBeInstanceOf(EntityMock);
  });

  it('returns entity with seeded properties', () => {
    const entity = create(EntityMock);

    expect(entity.name).toStrictEqual(expect.any(String));
    expect(entity.age).toStrictEqual(expect.any(Number));
  });

  describe('with relations', () => {
    it('seeds one-to-one', () => {
      const entity = create(OneToOnePrimaryEntityMock);

      expect(entity.sibling).toBeInstanceOf(OneToOneSecondaryEntityMock);
    });

    it('seeds many-to-one', () => {
      const parentEntity = create(ManyToOneParentEntityMock);

      expect(parentEntity.children).toHaveLength(2);

      parentEntity.children.forEach((childEntity) => {
        expect(childEntity).toBeInstanceOf(ManyToOneChildEntityMock);
      });
    });

    it('seeds one-to-many', () => {
      const entity = create(ManyToOneChildEntityMock);

      expect(entity.parent).toBeInstanceOf(ManyToOneParentEntityMock);
    });

    it('seeds many-to-many', () => {
      const entity = create(ManyToManyPrimaryEntityMock);

      expect(entity.siblings).toHaveLength(2);

      entity.siblings.forEach((childEntity) => {
        expect(childEntity).toBeInstanceOf(ManyToManySecondaryEntityMock);
      });
    });
  });

  describe('with embeds', () => {
    it('seeds shallow embed', () => {
      const entity = create(EmbedEntityMock);

      expect(entity.name.first).toStrictEqual(expect.any(String));
      expect(entity.name.last).toStrictEqual(expect.any(String));
    });

    it('seeds deep embed', () => {
      const entity = create(DeepEmbedEntityMock);

      expect(entity.name.other.first).toStrictEqual(expect.any(String));
      expect(entity.name.other.last).toStrictEqual(expect.any(String));
    });
  });

  describe('with concrete table inheritance', () => {
    it('seeds properties from parent entities', () => {
      const entity = create(InheritanceEntityMock);

      expect(entity.name).toEqual(expect.any(String));
      expect(entity.address).toEqual(expect.any(String));
      expect(entity.age).toEqual(expect.any(Number));
    });
  });

  describe('with single table inheritance', () => {
    it('seeds properties from parent entities', () => {
      const entity = create(SingleInheritanceChildEntityMock);

      expect(entity.name).toEqual(expect.any(String));
      expect(entity.age).toEqual(expect.any(Number));
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
