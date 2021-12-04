import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToManyPrimaryEntityMock } from './ManyToManyPrimaryEntityMock';

@Entity()
export class ManyToManySecondaryEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToMany(() => ManyToManyPrimaryEntityMock, (target) => target.siblings)
  public siblings!: ManyToManyPrimaryEntityMock[];
}
