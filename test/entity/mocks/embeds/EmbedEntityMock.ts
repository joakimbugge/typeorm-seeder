import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../src';
import { EmbedMock } from './EmbedMock';

@Entity()
export class EmbedEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column(() => EmbedMock)
  @Seed()
  public name!: EmbedMock;
}
