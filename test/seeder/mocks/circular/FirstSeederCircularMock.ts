import { BaseSeeder, Seeder } from '../../../../src';
import { SecondSeederCircularMock } from './SecondSeederCircularMock';

@Seeder({ runsBefore: [SecondSeederCircularMock] })
export class FirstSeederCircularMock implements BaseSeeder {
  public seed(): void {
    // pass
  }
}
