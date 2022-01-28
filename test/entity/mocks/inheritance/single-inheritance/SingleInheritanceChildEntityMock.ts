import { randNumber } from '@ngneat/falso';
import { ChildEntity, Column } from 'typeorm';
import { Seed } from '../../../../../src';
import { SingleInheritanceEntityMock } from './SingleInheritanceEntityMock';

@ChildEntity()
export class SingleInheritanceChildEntityMock extends SingleInheritanceEntityMock {
  @Column()
  @Seed(randNumber)
  public age!: number;
}
