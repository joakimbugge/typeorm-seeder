import { BaseSeeder } from '../../../src';
import { loadSeeders } from '../../../src/seeder/utils/loadSeeders';
import { OtherSeederMock } from '../mocks/loader/OtherSeederMock';
import { SeederMock } from '../mocks/loader/SeederMock';

describe(loadSeeders.name, () => {
  it('returns list of seeder constructors from path', () => {
    expect(loadSeeders('test/seeder/mocks/loader/**/*')).toEqual([OtherSeederMock, SeederMock]);
  });

  it('returns seeder constructor as list from path', () => {
    expect(loadSeeders('test/seeder/mocks/loader/SeederMock.ts')).toEqual([SeederMock]);
  });

  it('returns seeder constructor as list', () => {
    expect(loadSeeders(FirstSeederMock)).toEqual([FirstSeederMock]);
  });
});

class FirstSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
