import { uniq } from 'lodash';
import { SeederEntry } from '../stores/SeederStore';
import { getSeederConstructor } from './getSeederConstructor';

export function getWithInverseDependencies(
  currentEntry: SeederEntry,
  index: number,
  seeders: SeederEntry[],
): SeederEntry {
  const { options } = currentEntry;

  const runsBefore = seeders
    .filter((entry) => isRunningAfter(entry, currentEntry))
    .map(getSeederConstructor);

  const runsAfter = seeders
    .filter((entry) => isRunningBefore(entry, currentEntry))
    .map(getSeederConstructor);

  return <SeederEntry>{
    ...currentEntry,
    options: {
      ...options,
      runsBefore: uniq([...options.runsBefore, ...runsBefore]),
      runsAfter: uniq([...options.runsAfter, ...runsAfter]),
    },
  };
}

function isRunningAfter(after: SeederEntry, before: SeederEntry): boolean {
  return (
    after.options.runsAfter.includes(before.ctor) || before.options.runsBefore.includes(after.ctor)
  );
}

function isRunningBefore(before: SeederEntry, after: SeederEntry): boolean {
  return (
    before.options.runsBefore.includes(after.ctor) || after.options.runsAfter.includes(before.ctor)
  );
}
