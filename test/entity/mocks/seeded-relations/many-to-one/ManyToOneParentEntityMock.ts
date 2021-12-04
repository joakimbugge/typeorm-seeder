import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../../src';
import { ManyToOneChildEntityMock } from './ManyToOneChildEntityMock';

@Entity()
export class ManyToOneParentEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(() => ManyToOneChildEntityMock, (target) => target.parent)
  @Seed({ amount: 2 })
  public children!: ManyToOneChildEntityMock[];
}
