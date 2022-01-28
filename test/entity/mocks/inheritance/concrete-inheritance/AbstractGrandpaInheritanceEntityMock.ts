import { randStreetName } from '@ngneat/falso';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';

export abstract class AbstractGrandpaInheritanceEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(randStreetName)
  public address!: string;
}
