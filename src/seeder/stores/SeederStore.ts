import { SeederOptions } from '../decorators/Seeder';
import { SeederConstructor } from '../models/SeederConstructor';

export interface SeederEntry {
  ctor: SeederConstructor;
  options: Required<SeederOptions>;
}

export abstract class SeederStore {
  private static store: Map<SeederConstructor, Required<SeederOptions>> = new Map();

  public static get(ctor: SeederConstructor): Required<SeederOptions> {
    return this.store.get(ctor) || getDefaultOptions();
  }

  public static set(ctor: SeederConstructor, options: Required<SeederOptions>): void {
    this.store.set(ctor, options);
  }

  public static clear(): void {
    this.store.clear();
  }
}

function getDefaultOptions(): Required<SeederOptions> {
  return {
    runsAfter: [],
    runsBefore: [],
  };
}
