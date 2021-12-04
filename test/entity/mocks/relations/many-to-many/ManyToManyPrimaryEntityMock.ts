import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToManySecondaryEntityMock } from './ManyToManySecondaryEntityMock';

@Entity()
export class ManyToManyPrimaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToMany(() => ManyToManySecondaryEntityMock, (target) => target.siblings)
  @JoinTable()
  public siblings!: ManyToManySecondaryEntityMock[];
}
