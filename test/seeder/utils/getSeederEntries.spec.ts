import { BaseSeeder } from '../../../src';
import { SeederEntry } from '../../../src/seeder/stores/SeederStore';
import { getSeederEntries } from '../../../src/seeder/utils/getSeederEntries';
import { FirstSeederMock } from '../mocks/sorting/FirstSeederMock';
import { SecondSeederMock } from '../mocks/sorting/SecondSeederMock';
import { ThirdSeederMock } from '../mocks/sorting/ThirdSeederMock';

describe(getSeederEntries.name, () => {
  it('returns sorted entries of provided seeders', () => {
    const seeders = [ThirdSeederMock, FirstSeederMock, SecondSeederMock];

    expect(getSeederEntries(seeders)).toEqual<SeederEntry[]>([
      {
        ctor: FirstSeederMock,
        options: {
          runsAfter: [],
          runsBefore: [SecondSeederMock, ThirdSeederMock],
        },
      },
      {
        ctor: SecondSeederMock,
        options: {
          runsAfter: [FirstSeederMock],
          runsBefore: [ThirdSeederMock],
        },
      },
      {
        ctor: ThirdSeederMock,
        options: {
          runsAfter: [SecondSeederMock, FirstSeederMock],
          runsBefore: [],
        },
      },
    ]);
  });

  it('returns default options for undecorated seeder', () => {
    expect(getSeederEntries([UndecoratedSeederMock])).toEqual<SeederEntry[]>([
      { ctor: UndecoratedSeederMock, options: { runsBefore: [], runsAfter: [] } },
    ]);
  });
});

class UndecoratedSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
