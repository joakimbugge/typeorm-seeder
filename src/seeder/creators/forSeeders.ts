import { runSeeders } from '../builders/runSeeders';
import { BaseSeeder } from '../interfaces/BaseSeeder';
import { SeederConstructor } from '../models/SeederConstructor';
import { getSeederEntries } from '../utils/getSeederEntries';

export interface SeederCreator {
  run(options?: SeederCreatorOptions): Promise<SeederConstructor[]>;
}

export interface SeederCreatorOptions {
  resolver?: (seeder: SeederConstructor) => BaseSeeder;
}

export function forSeeders(seeders: (SeederConstructor | string)[]): SeederCreator {
  return {
    run(options): Promise<SeederConstructor[]> {
      const entries = getSeederEntries(seeders);
      return runSeeders(entries, options);
    },
  };
}
