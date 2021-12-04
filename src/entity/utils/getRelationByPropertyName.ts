import { getMetadataArgsStorage } from 'typeorm';
import { Entity } from '../models/Entity';
import { Relation, RelationType } from '../models/Relation';

export function getRelationByPropertyName(
  entity: Entity,
  propertyName: string,
): Relation | undefined {
  const relation = getMetadataArgsStorage()
    .filterRelations(entity)
    .find((r) => r.propertyName === propertyName);

  if (!relation) {
    return undefined;
  }

  const getType = <() => Entity>relation.type;

  return {
    type: <RelationType>relation.relationType,
    target: getType(),
  };
}
