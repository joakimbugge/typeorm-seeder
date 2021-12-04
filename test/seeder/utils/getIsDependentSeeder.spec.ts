import { BaseSeeder } from '../../../src';
import { SeederEntry } from '../../../src/seeder/stores/SeederStore';
import { getDependentSeeders } from '../../../src/seeder/utils/getDependentSeeders';
import { getIsDependentSeeder } from '../../../src/seeder/utils/getIsDependentSeeder';

describe(getDependentSeeders.name, () => {
  it('returns true for seeder with runsBefore', () => {
    const seederEntry: SeederEntry = {
      ctor: SecondSeederMock,
      options: { runsBefore: [FirstSeederMock], runsAfter: [] },
    };

    expect(getIsDependentSeeder(seederEntry)).toBe(true);
  });

  it('returns true for seeder with runsAfter', () => {
    const seederEntry: SeederEntry = {
      ctor: SecondSeederMock,
      options: { runsAfter: [FirstSeederMock], runsBefore: [] },
    };

    expect(getIsDependentSeeder(seederEntry)).toBe(true);
  });

  it('returns false for without runsBefore/runsAfter', () => {
    const seederEntry: SeederEntry = {
      ctor: SecondSeederMock,
      options: { runsAfter: [], runsBefore: [] },
    };

    expect(getIsDependentSeeder(seederEntry)).toBe(false);
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
