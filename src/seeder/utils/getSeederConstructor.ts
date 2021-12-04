import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry } from '../stores/SeederStore';

export function getSeederConstructor(seeder: SeederEntry): SeederConstructor {
  return seeder.ctor;
}
