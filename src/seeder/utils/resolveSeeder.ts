import { SeederRunnerOptions } from '../creators/forSeeders';
import { BaseSeeder } from '../interfaces/BaseSeeder';
import { SeederConstructor } from '../models/SeederConstructor';

export function resolveSeeder(
  seeder: SeederConstructor,
  options?: SeederRunnerOptions,
): BaseSeeder {
  return options?.resolver ? options.resolver(seeder) : new seeder();
}
