import { isEmpty } from 'lodash';
import { SeederEntry } from '../stores/SeederStore';

export function getIsDependentSeeder(seeder: SeederEntry): boolean {
  const {
    options: { runsBefore, runsAfter },
  } = seeder;

  return !isEmpty(runsAfter) || !isEmpty(runsBefore);
}
