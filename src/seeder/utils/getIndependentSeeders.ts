import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry } from '../stores/SeederStore';
import { getSeederConstructor } from './getSeederConstructor';
import { getIsDependentSeeder } from './getIsDependentSeeder';

export function getIndependentSeeders(seeders: SeederEntry[]): SeederConstructor[] {
  return seeders.filter(isIndependentSeeder).map(getSeederConstructor);
}

function isIndependentSeeder(seeder: SeederEntry): boolean {
  return !getIsDependentSeeder(seeder);
}
