import { BaseSeeder, Seeder } from '../../../../src';
import { SecondSeederMock } from './SecondSeederMock';

@Seeder({ runsAfter: [SecondSeederMock] })
export class ThirdSeederMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
