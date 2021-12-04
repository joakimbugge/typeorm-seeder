import { defaults } from 'lodash';
import { SeederConstructor } from '../models/SeederConstructor';
import { SeederStore } from '../stores/SeederStore';

export interface SeederOptions {
  runsAfter?: SeederConstructor[];
  runsBefore?: SeederConstructor[];
}

export function Seeder(options?: SeederOptions): ClassDecorator {
  const opts = defaults(options, { runsAfter: [], runsBefore: [] });

  return function (ctor): void {
    SeederStore.set(ctor as unknown as SeederConstructor, opts);
  };
}
