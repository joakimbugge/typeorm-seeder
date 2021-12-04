import { Options } from '@hapi/topo';
import { SeederEntry } from '../stores/SeederStore';

export function toSorterNodeOptions(entry: SeederEntry): Options {
  const { runsBefore, runsAfter } = entry.options;

  return {
    group: entry.ctor.name,
    after: runsAfter.map((ctor) => ctor.name),
    before: runsBefore.map((ctor) => ctor.name),
  };
}
