import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';
import { OneToOneSecondaryEntityMock } from './OneToOneSecondaryEntityMock';

@Entity()
export class OneToOnePrimaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => OneToOneSecondaryEntityMock, (target) => target.sibling)
  @JoinColumn()
  @Seed()
  public sibling!: OneToOneSecondaryEntityMock;
}
