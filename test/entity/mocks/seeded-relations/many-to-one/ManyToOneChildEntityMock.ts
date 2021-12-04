import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';
import { ManyToOneParentEntityMock } from './ManyToOneParentEntityMock';

@Entity()
export class ManyToOneChildEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ManyToOneParentEntityMock, (target) => target.children)
  @Seed()
  public parent!: ManyToOneParentEntityMock;
}
