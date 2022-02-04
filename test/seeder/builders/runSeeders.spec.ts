import { BaseSeeder, Seeder, SeederConstructor } from '../../../src';
import { runSeeders } from '../../../src/seeder/builders/runSeeders';
import { toSeederEntry } from '../../../src/seeder/utils/toSeederEntry';

describe(runSeeders.name, () => {
  it('runs all seeders', async () => {
    const seeders = [SeederMock, SecondSeederMock, ThirdSeederMock];
    const entries = seeders.map(toSeederEntry);
    const completedSeeders = await runSeeders(entries);

    expect(completedSeeders).toEqual(seeders);
  });

  it('calls onEachComplete after each completion', async () => {
    const callback = jest.fn((seeder: SeederConstructor) => seeder);

    const seeders = [SeederMock, SecondSeederMock, ThirdSeederMock];
    const entries = seeders.map(toSeederEntry);

    await runSeeders(entries, {
      onEachComplete(seeder) {
        callback(seeder);
      },
    });

    expect(callback.mock.calls).toHaveLength(3);
    expect(callback.mock.calls[0][0]).toEqual(seeders[0]);
    expect(callback.mock.calls[1][0]).toEqual(seeders[1]);
    expect(callback.mock.calls[2][0]).toEqual(seeders[2]);
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
