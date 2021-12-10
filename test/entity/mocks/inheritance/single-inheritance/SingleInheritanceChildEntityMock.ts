import * as faker from 'faker';
import { ChildEntity, Column } from 'typeorm';
import { Seed } from '../../../../../src';
import { SingleInheritanceEntityMock } from './SingleInheritanceEntityMock';

@ChildEntity()
export class SingleInheritanceChildEntityMock extends SingleInheritanceEntityMock {
  @Column()
  @Seed(() => faker.datatype.number())
  public age!: number;
}
