import { randFirstName, randLastName } from '@ngneat/falso';
import { Column } from 'typeorm';
import { Seed } from '../../../../src';

export class EmbedMock {
  @Column()
  @Seed(randFirstName)
  public first!: string;

  @Column()
  @Seed(randLastName)
  public last!: string;
}
