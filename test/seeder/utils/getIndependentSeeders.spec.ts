import { BaseSeeder } from '../../../src';
import { SeederEntry } from '../../../src/seeder/stores/SeederStore';
import { getIndependentSeeders } from '../../../src/seeder/utils/getIndependentSeeders';

describe(getIndependentSeeders.name, () => {
  it('returns list of dependent seeders', () => {
    const dependentSeederEntry: SeederEntry = {
      ctor: SecondSeederMock,
      options: { runsBefore: [FirstSeederMock], runsAfter: [] },
    };
    const independentSeederEntry: SeederEntry = {
      ctor: FirstSeederMock,
      options: { runsBefore: [], runsAfter: [] },
    };

    const seederEntries = [dependentSeederEntry, independentSeederEntry];
    const dependentSeeders = getIndependentSeeders(seederEntries);

    expect(dependentSeeders).toContain(independentSeederEntry.ctor);
    expect(dependentSeeders).not.toContain(dependentSeederEntry.ctor);
  });
});

class FirstSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

class SecondSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
