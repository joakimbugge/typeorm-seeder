import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';
import { OneToOnePrimaryEntityMock } from './OneToOnePrimaryEntityMock';

@Entity()
export class OneToOneSecondaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => OneToOnePrimaryEntityMock, (target) => target.sibling)
  @Seed()
  public sibling!: OneToOnePrimaryEntityMock;
}
