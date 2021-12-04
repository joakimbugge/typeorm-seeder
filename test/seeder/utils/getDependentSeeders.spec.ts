import { BaseSeeder } from '../../../src';
import { SeederEntry } from '../../../src/seeder/stores/SeederStore';
import { getDependentSeeders } from '../../../src/seeder/utils/getDependentSeeders';

describe(getDependentSeeders.name, () => {
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
    const dependentSeeders = getDependentSeeders(seederEntries);

    expect(dependentSeeders).toContain(dependentSeederEntry.ctor);
    expect(dependentSeeders).not.toContain(independentSeederEntry.ctor);
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
