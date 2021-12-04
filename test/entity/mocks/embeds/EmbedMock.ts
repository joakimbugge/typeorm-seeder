import * as faker from 'faker';
import { Column } from 'typeorm';
import { Seed } from '../../../../src';

export class EmbedMock {
  @Column()
  @Seed(() => faker.name.firstName())
  public first!: string;

  @Column()
  @Seed(() => faker.name.lastName())
  public last!: string;
}
