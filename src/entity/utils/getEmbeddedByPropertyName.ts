import { getMetadataArgsStorage } from 'typeorm';
import { Entity } from '../models/Entity';

export function getEmbeddedByPropertyName(
  entity: Entity,
  propertyName: string,
): Entity | undefined {
  return <Entity>getMetadataArgsStorage()
    .filterEmbeddeds(entity)
    .find((e) => e.propertyName === propertyName)
    ?.type();
}
