import * as faker from 'faker';
import { Column } from 'typeorm';
import { Seed } from '../../../../src';
import { EmbedMock } from './EmbedMock';

export class DeepEmbedMock {
  @Column()
  @Seed(() => faker.name.firstName())
  public middle!: string;

  @Column(() => EmbedMock)
  @Seed()
  public other!: EmbedMock;
}
