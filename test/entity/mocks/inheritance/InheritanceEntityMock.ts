import * as faker from 'faker';
import { Column, Entity } from 'typeorm';
import { Seed } from '../../../../src';
import { AbstractDadInheritanceEntityMock } from './AbstractDadInheritanceEntityMock';

@Entity()
export class InheritanceEntityMock extends AbstractDadInheritanceEntityMock {
  @Column()
  @Seed(() => faker.datatype.number())
  public age!: number;
}
