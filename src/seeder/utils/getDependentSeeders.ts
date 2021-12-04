import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry } from '../stores/SeederStore';
import { getSeederConstructor } from './getSeederConstructor';
import { getIsDependentSeeder } from './getIsDependentSeeder';

export function getDependentSeeders(seeders: SeederEntry[]): SeederConstructor[] {
  return seeders.filter(getIsDependentSeeder).map(getSeederConstructor);
}
