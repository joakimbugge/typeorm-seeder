import { runSeeders } from '../builders/runSeeders';
import { BaseSeeder } from '../interfaces/BaseSeeder';
import { SeederConstructor } from '../models/SeederConstructor';
import { getSeederEntries } from '../utils/getSeederEntries';

export interface SeederRunner {
  run(options?: SeederRunnerOptions): Promise<SeederConstructor[]>;
}

export interface SeederRunnerOptions {
  resolver?: (seeder: SeederConstructor) => BaseSeeder;
  onEachComplete?: (seeder: SeederConstructor) => void;
}

export function forSeeders(seeders: (SeederConstructor | string)[]): SeederRunner {
  return {
    run(options): Promise<SeederConstructor[]> {
      const entries = getSeederEntries(seeders);
      return runSeeders(entries, options);
    },
  };
}
