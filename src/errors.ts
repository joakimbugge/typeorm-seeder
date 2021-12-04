import { Entity } from './entity/models/Entity';
import { SeederConstructor } from './seeder/models/SeederConstructor';

export class EntityConnectionError extends Error {
  constructor(entity: Entity) {
    super(`No connection found for entity ${entity.name}`);
  }
}

export class CircularSeederDependencyError extends Error {
  constructor(seeder: SeederConstructor) {
    super(`${seeder.name} may have circular dependencies`);
  }
}
