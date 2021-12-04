import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOnePrimaryEntityMock } from './OneToOnePrimaryEntityMock';

@Entity()
export class OneToOneSecondaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => OneToOnePrimaryEntityMock, (target) => target.sibling)
  public sibling!: OneToOnePrimaryEntityMock;
}
