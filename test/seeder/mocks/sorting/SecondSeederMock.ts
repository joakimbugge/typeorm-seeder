import { BaseSeeder, Seeder } from '../../../../src';
import { FirstSeederMock } from './FirstSeederMock';

@Seeder({ runsAfter: [FirstSeederMock] })
export class SecondSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
