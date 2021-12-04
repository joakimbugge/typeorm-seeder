import { BaseSeeder, Seeder } from '../../../src';
import { getWithDeepDependencies } from '../../../src/seeder/utils/getWithDeepDependencies';
import { toSeederEntry } from '../../../src/seeder/utils/toSeederEntry';

describe(getWithDeepDependencies.name, () => {
  it('returns seeder entry with deep runsBefore', () => {
    const withDeepDependencies = [
      FirstSeederMock,
      FirstRunsBeforeSeederMock,
      SecondRunsBeforeSeederMock,
    ]
      .map(toSeederEntry)
      .map(getWithDeepDependencies);

    const seederEntry = withDeepDependencies.at(2);

    expect(seederEntry?.options.runsBefore).toEqual([FirstRunsBeforeSeederMock, FirstSeederMock]);
  });

  it('returns seeder entry with deep runsAfter', () => {
    const withDeepDependencies = [
      FirstSeederMock,
      FirstRunsAfterSeederMock,
      SecondRunsAfterSeederMock,
    ]
      .map(toSeederEntry)
      .map(getWithDeepDependencies);

    const seederEntry = withDeepDependencies.at(2);

    expect(seederEntry?.options.runsAfter).toEqual([FirstRunsAfterSeederMock, FirstSeederMock]);
  });
});

@Seeder()
class FirstSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

@Seeder({ runsBefore: [FirstSeederMock] })
class FirstRunsBeforeSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

@Seeder({ runsBefore: [FirstRunsBeforeSeederMock] })
class SecondRunsBeforeSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

@Seeder({ runsAfter: [FirstSeederMock] })
class FirstRunsAfterSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

@Seeder({ runsAfter: [FirstRunsAfterSeederMock] })
class SecondRunsAfterSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
