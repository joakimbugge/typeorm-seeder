import { BaseSeeder, Seeder } from '../../../src';
import { runSeeders } from '../../../src/seeder/builders/runSeeders';
import { toSeederEntry } from '../../../src/seeder/utils/toSeederEntry';

describe(runSeeders.name, () => {
  it('runs all seeders', async () => {
    const seeders = [SeederMock, SecondSeederMock, ThirdSeederMock];
    const entries = seeders.map(toSeederEntry);
    const completedSeeders = await runSeeders(entries);

    expect(completedSeeders).toEqual(seeders);
  });
});

@Seeder()
class SeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

@Seeder()
class SecondSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}

@Seeder()
class ThirdSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
