import { create } from '../builders/create';
import { Entity } from '../models/Entity';

export function resolveEmbedded<T>(embeddedEntity: Entity): T {
  return create<T>(embeddedEntity);
}
