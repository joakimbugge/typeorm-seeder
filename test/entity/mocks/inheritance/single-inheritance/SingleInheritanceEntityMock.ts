import { randFirstName } from '@ngneat/falso';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Seed } from '../../../../../src';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type ' } })
export class SingleInheritanceEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(randFirstName)
  public name!: string;
}
