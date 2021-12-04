import { Connection, getMetadataArgsStorage } from 'typeorm';
import { Entity } from '../models/Entity';

export function mutateCascadeInsert(entity: Entity, connection: Connection): void {
  const entities = getRelatedEntities(entity);

  entities.forEach((entity) => {
    const relationsMetadata = connection.getMetadata(entity).relations;

    relationsMetadata.forEach((relationMetadata) => {
      relationMetadata.isCascadeInsert = true;

      if (relationMetadata.inverseRelation) {
        relationMetadata.inverseRelation.isCascadeInsert = true;
      }
    });
  });
}

function getRelatedEntities(entity: Entity): Entity[] {
  const entities: Entity[] = [];

  const addEntity = (entity: Entity): void => {
    getMetadataArgsStorage()
      .filterRelations(entity)
      .forEach((relation) => {
        const getType = <() => Entity>relation.type;
        const inverseEntity = getType();

        if (!entities.includes(entity)) {
          entities.push(entity);
          addEntity(entity);
        }

        if (!entities.includes(inverseEntity)) {
          entities.push(inverseEntity);
          addEntity(inverseEntity);
        }
      });
  };

  addEntity(entity);

  return entities;
}
