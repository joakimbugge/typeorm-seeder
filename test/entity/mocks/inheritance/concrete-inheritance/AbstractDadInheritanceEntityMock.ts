import * as faker from 'faker';
import { Column } from 'typeorm';
import { Seed } from '../../../../../src';
import { AbstractGrandpaInheritanceEntityMock } from './AbstractGrandpaInheritanceEntityMock';

export abstract class AbstractDadInheritanceEntityMock extends AbstractGrandpaInheritanceEntityMock {
  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;
}
