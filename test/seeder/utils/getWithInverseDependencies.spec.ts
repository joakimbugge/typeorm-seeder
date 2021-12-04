import { BaseSeeder, Seeder } from '../../../src';
import { getWithInverseDependencies } from '../../../src/seeder/utils/getWithInverseDependencies';
import { toSeederEntry } from '../../../src/seeder/utils/toSeederEntry';

describe(getWithInverseDependencies.name, () => {
  it('returns seeder entry with inverse runsBefore dependencies', () => {
    const withInverseDependencies = [FirstRunsBeforeSeederMock, SecondRunsBeforeSeederMock]
      .map(toSeederEntry)
      .map(getWithInverseDependencies);

    const [seederEntry] = withInverseDependencies;

    expect(seederEntry.options.runsAfter).toEqual([SecondRunsBeforeSeederMock]);
  });

  it('returns seeder entry with inverse runsAfter dependencies', () => {
    const withInverseDependencies = [FirstRunsAfterSeederMock, SecondRunsAfterSeederMock]
      .map(toSeederEntry)
      .map(getWithInverseDependencies);

    const [seederEntry] = withInverseDependencies;

    expect(seederEntry.options.runsBefore).toEqual([SecondRunsAfterSeederMock]);
  });
});

@Seeder()
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

@Seeder()
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
