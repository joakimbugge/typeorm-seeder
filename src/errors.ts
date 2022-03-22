import { SeederConstructor } from './seeder/models/SeederConstructor';

export class CircularSeederDependencyError extends Error {
  constructor(seeder: SeederConstructor) {
    super(`${seeder.name} may have circular dependencies`);
  }
}
