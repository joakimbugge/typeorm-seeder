import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '../../../../src';
import { DeepEmbedMock } from './DeepEmbedMock';

@Entity()
export class DeepEmbedEntityMock {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column(() => DeepEmbedMock)
  @Seed()
  public name!: DeepEmbedMock;
}
