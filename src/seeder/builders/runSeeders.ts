import { SeederCreatorOptions } from '../creators/forSeeders';
import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry } from '../stores/SeederStore';
import { getDependentSeeders } from '../utils/getDependentSeeders';
import { getIndependentSeeders } from '../utils/getIndependentSeeders';
import { resolveSeeder } from '../utils/resolveSeeder';

export async function runSeeders(
  seeders: SeederEntry[],
  options?: SeederCreatorOptions,
): Promise<SeederConstructor[]> {
  const dependentSeeders = getDependentSeeders(seeders);
  const independentSeeders = getIndependentSeeders(seeders);
  const completedSeeders: SeederConstructor[] = [];

  const runSeeder = async (seeder: SeederConstructor): Promise<unknown> => {
    completedSeeders.push(seeder);
    return resolveSeeder(seeder, options).seed();
  };

  for (const seeder of dependentSeeders) {
    await runSeeder(seeder);
  }

  await Promise.all(independentSeeders.map(runSeeder));

  return completedSeeders;
}
