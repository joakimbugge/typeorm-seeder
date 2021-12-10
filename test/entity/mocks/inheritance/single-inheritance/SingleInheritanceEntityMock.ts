import * as faker from 'faker';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Seed } from '../../../../../src';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type ' } })
export class SingleInheritanceEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;
}
