import { Options } from '@hapi/topo';
import { BaseSeeder, Seeder } from '../../../src';
import { toSeederEntry } from '../../../src/seeder/utils/toSeederEntry';
import { toSorterNodeOptions } from '../../../src/seeder/utils/toSorterNodeOptions';

describe(toSorterNodeOptions.name, () => {
  it('returns seeder entry as sorter node options', () => {
    const seederEntry = toSeederEntry(ThirdSeederMock);

    expect(toSorterNodeOptions(seederEntry)).toEqual(<Options>{
      group: ThirdSeederMock.name,
      before: [SecondSeederMock.name],
      after: [FirstSeederMock.name],
    });
  });
});

@Seeder()
class FirstSeederMock implements BaseSeeder {
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

@Seeder({ runsBefore: [SecondSeederMock], runsAfter: [FirstSeederMock] })
class ThirdSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
