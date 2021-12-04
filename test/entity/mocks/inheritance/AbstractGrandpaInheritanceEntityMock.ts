import * as faker from 'faker';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../src';

export abstract class AbstractGrandpaInheritanceEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.address.streetName())
  public address!: string;
}
