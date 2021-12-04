import { flatten, uniq } from 'lodash';
import { SeederOptions } from '../decorators/Seeder';
import { SeederConstructor } from '../models/SeederConstructor';
import { SeederEntry } from '../stores/SeederStore';

export function getWithDeepDependencies(
  currentEntry: SeederEntry,
  index: number,
  seeders: SeederEntry[],
): SeederEntry {
  const { options } = currentEntry;
  const runsAfter = getDeepDependencies(currentEntry, 'runsAfter', seeders);
  const runsBefore = getDeepDependencies(currentEntry, 'runsBefore', seeders);

  return <SeederEntry>{
    ...currentEntry,
    options: {
      ...options,
      runsBefore: uniq([...options.runsBefore, ...runsBefore]),
      runsAfter: uniq([...options.runsAfter, ...runsAfter]),
    },
  };
}

function getDeepDependencies(
  seeder: SeederEntry | undefined,
  prop: keyof SeederOptions,
  seeders: SeederEntry[],
  dependencies?: SeederConstructor[],
): SeederConstructor[] {
  let deps = dependencies || [];

  // Dependency is missing, may not have been included in seeders()
  if (!seeder) {
    return [];
  }

  seeder.options[prop].forEach((dependency) => {
    deps.push(dependency);

    const nextSeeder = seeders.find(({ ctor }) => dependency == ctor);
    deps = deps.concat(getDeepDependencies(nextSeeder, prop, seeders, deps));
  });

  return uniq(flatten(deps));
}
