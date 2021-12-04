import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';
import { ManyToManySecondaryEntityMock } from './ManyToManySecondaryEntityMock';

@Entity()
export class ManyToManyPrimaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToMany(() => ManyToManySecondaryEntityMock, (target) => target.siblings)
  @JoinTable()
  @Seed({ amount: 2 })
  public siblings!: ManyToManySecondaryEntityMock[];
}
