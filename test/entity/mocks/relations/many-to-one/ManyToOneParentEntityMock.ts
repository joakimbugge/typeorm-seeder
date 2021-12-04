import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOneSecondChildEntityMock } from './ManyToOneSecondChildEntityMock';
import { ManyToOneChildEntityMock } from './ManyToOneChildEntityMock';

@Entity()
export class ManyToOneParentEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(() => ManyToOneChildEntityMock, (target) => target.parent)
  public children!: ManyToOneChildEntityMock[];

  @OneToMany(() => ManyToOneSecondChildEntityMock, (target) => target.parent)
  public secondChildren!: ManyToOneSecondChildEntityMock[];
}
