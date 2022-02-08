import { randFirstName } from '@ngneat/falso';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../src';
import { SeedStore } from '../../../src/entity/stores/SeedStore';

describe(SeedStore.name, () => {
  describe(SeedStore.get.name, () => {
    it('gets properties for entity', () => {
      expect(SeedStore.get(EntityMock)).toEqual({
        name: {
          callback: expect.any(Function),
          options: {},
        },
      });
    });

    it('fallbacks to default options', () => {
      expect(SeedStore.get(MissingEntityMock)).toEqual({});
    });
  });

  describe(SeedStore.set.name, () => {
    it('saves property and options', () => {
      const options = {
        callback: () => {
          // pass
        },
        options: {},
      };

      SeedStore.set(MissingEntityMock, 'name', options);

      expect(SeedStore.get(MissingEntityMock)).toEqual({ name: options });
    });
  });

  describe(SeedStore.clear.name, () => {
    it('clears entire store', () => {
      SeedStore.clear();

      expect(SeedStore.get(EntityMock)).toEqual({});
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
}

@Entity()
class MissingEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;
}
