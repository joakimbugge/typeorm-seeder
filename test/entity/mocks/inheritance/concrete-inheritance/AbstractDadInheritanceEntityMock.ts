import { randFirstName } from '@ngneat/falso';
import { Column } from 'typeorm';
import { Seed } from '../../../../../src';
import { AbstractGrandpaInheritanceEntityMock } from './AbstractGrandpaInheritanceEntityMock';

export abstract class AbstractDadInheritanceEntityMock extends AbstractGrandpaInheritanceEntityMock {
  @Column()
  @Seed(randFirstName)
  public name!: string;
}
