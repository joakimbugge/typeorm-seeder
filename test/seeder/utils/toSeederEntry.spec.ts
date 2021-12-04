import { BaseSeeder, Seeder } from '../../../src';
import { toSeederEntry } from '../../../src/seeder/utils/toSeederEntry';

describe(toSeederEntry.name, () => {
  it('returns seeder entry for decorated seeder', () => {
    expect(toSeederEntry(FirstSeederMock)).toEqual({
      ctor: FirstSeederMock,
      options: {
        runsAfter: [],
        runsBefore: [],
      },
    });
  });
});

@Seeder()
class FirstSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
