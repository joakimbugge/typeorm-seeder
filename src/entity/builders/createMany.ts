import { Entity } from '../models/Entity';
import { SeedStore } from '../stores/SeedStore';
import { getEmbeddedByPropertyName } from '../utils/getEmbeddedByPropertyName';
import { getRelationByPropertyName } from '../utils/getRelationByPropertyName';
import { resolveEmbedded } from '../utils/resolveEmbedded';
import { resolveRelation } from '../utils/resolveRelation';

export interface CreateManyOptions {
  skipRelations: Entity[];
}

export function createMany<T>(amount: number, entity: Entity<T>, options?: CreateManyOptions): T[] {
  const instances: T[] = [];
  const properties = SeedStore.get(entity);
  const { skipRelations } = options || getDefaultOptions();

  for (let i = 0; i < amount; i++) {
    const instance: any = new entity();

    for (const propertyName in properties) {
      const property = properties[propertyName];
      const relation = getRelationByPropertyName(entity, propertyName);
      const embedded = getEmbeddedByPropertyName(entity, propertyName);

      if (relation && skipRelations.includes(relation.target)) {
        continue;
      }

      if (relation) {
        instance[propertyName] = resolveRelation(entity, relation, property.options.amount || 1);
      } else if (embedded) {
        instance[propertyName] = resolveEmbedded(embedded);
      } else {
        instance[propertyName] = property.callback();
      }
    }

    instances.push(instance);
  }

  return instances;
}

function getDefaultOptions(): CreateManyOptions {
  return { skipRelations: [] };
}
