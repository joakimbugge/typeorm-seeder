import { Sorter } from '@hapi/topo';
import { CircularSeederDependencyError } from '../../errors';
import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry } from '../stores/SeederStore';
import { getWithDeepDependencies } from './getWithDeepDependencies';
import { getWithInverseDependencies } from './getWithInverseDependencies';
import { loadSeeders } from './loadSeeders';
import { toSeederEntry } from './toSeederEntry';
import { toSorterNodeOptions } from './toSorterNodeOptions';

export function getSeederEntries(seeders: (SeederConstructor | string)[]): SeederEntry[] {
  const sorter = new Sorter<SeederEntry>();
  const entries = seeders.flatMap(loadSeeders).map(toSeederEntry);

  const entryWithCircularDependency = getHasCircularDependencies(entries);

  if (entryWithCircularDependency) {
    throw new CircularSeederDependencyError(entryWithCircularDependency.ctor);
  }

  entries
    .map(getWithInverseDependencies)
    .map(getWithDeepDependencies)
    .forEach((seeder) => {
      sorter.add(seeder, toSorterNodeOptions(seeder));
    });

  return sorter.nodes;
}

function getHasCircularDependencies(entries: SeederEntry[]): SeederEntry | undefined {
  return entries.find(({ options }) =>
    [...options.runsBefore, ...options.runsAfter].includes(undefined as any),
  );
}
