import { BaseSeeder, Seeder } from '../../../../src';
import { FirstSeederCircularMock } from './FirstSeederCircularMock';

@Seeder({ runsAfter: [FirstSeederCircularMock] })
export class SecondSeederCircularMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
