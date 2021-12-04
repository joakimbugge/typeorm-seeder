import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOneSecondaryEntityMock } from './OneToOneSecondaryEntityMock';

@Entity()
export class OneToOnePrimaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => OneToOneSecondaryEntityMock, (target) => target.sibling)
  @JoinColumn()
  public sibling!: OneToOneSecondaryEntityMock;
}
