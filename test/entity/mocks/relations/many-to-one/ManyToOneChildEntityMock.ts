import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOneParentEntityMock } from './ManyToOneParentEntityMock';

@Entity()
export class ManyToOneChildEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ManyToOneParentEntityMock, (target) => target.children)
  public parent!: ManyToOneParentEntityMock;
}
