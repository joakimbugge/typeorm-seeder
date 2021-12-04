import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOneParentEntityMock } from './ManyToOneParentEntityMock';

@Entity()
export class ManyToOneSecondChildEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ManyToOneParentEntityMock, (target) => target.secondChildren)
  public parent!: ManyToOneParentEntityMock;
}
