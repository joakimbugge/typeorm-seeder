import { randFirstName } from '@ngneat/falso';
import { Column } from 'typeorm';
import { Seed } from '../../../../src';
import { EmbedMock } from './EmbedMock';

export class DeepEmbedMock {
  @Column()
  @Seed(randFirstName)
  public middle!: string;

  @Column(() => EmbedMock)
  @Seed()
  public other!: EmbedMock;
}
