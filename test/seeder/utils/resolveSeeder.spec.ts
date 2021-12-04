import { BaseSeeder } from '../../../src';
import { resolveSeeder } from '../../../src/seeder/utils/resolveSeeder';

describe(resolveSeeder.name, () => {
  it('returns instance of seeder', () => {
    expect(resolveSeeder(FirstSeederMock)).toBeInstanceOf(FirstSeederMock);
  });

  it('returns seeder resolved by resolver', () => {
    expect(
      resolveSeeder(FirstSeederMock, { resolver: () => new SecondSeederMock() }),
    ).toBeInstanceOf(SecondSeederMock);
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
