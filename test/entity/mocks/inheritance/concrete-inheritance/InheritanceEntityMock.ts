import { randNumber } from '@ngneat/falso';
import { Column, Entity } from 'typeorm';
import { Seed } from '../../../../../src';
import { AbstractDadInheritanceEntityMock } from './AbstractDadInheritanceEntityMock';

@Entity()
export class InheritanceEntityMock extends AbstractDadInheritanceEntityMock {
  @Column()
  @Seed(randNumber)
  public age!: number;
}
