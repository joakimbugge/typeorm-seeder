import { Entity } from './Entity';

export enum RelationType {
  OneToOne = 'one-to-one',
  OneToMany = 'one-to-many',
  ManyToOne = 'many-to-one',
  ManyToMany = 'many-to-many',
}

export interface Relation {
  type: RelationType;
  target: Entity;
}
