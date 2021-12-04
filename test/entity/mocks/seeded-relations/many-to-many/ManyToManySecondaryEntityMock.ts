import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';
import { ManyToManyPrimaryEntityMock } from './ManyToManyPrimaryEntityMock';

@Entity()
export class ManyToManySecondaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToMany(() => ManyToManyPrimaryEntityMock, (target) => target.siblings)
  @Seed({ amount: 2 })
  public siblings!: ManyToManyPrimaryEntityMock[];
}
