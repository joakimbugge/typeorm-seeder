import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry, SeederStore } from '../stores/SeederStore';

export function toSeederEntry(seeder: SeederConstructor): SeederEntry {
  const options = SeederStore.get(seeder);

  return {
    ctor: seeder,
    options,
  };
}
