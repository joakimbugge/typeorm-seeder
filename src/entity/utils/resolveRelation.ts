import { create } from '../builders/create';
import { createMany, CreateManyOptions } from '../builders/createMany';
import { Entity } from '../models/Entity';
import { Relation, RelationType } from '../models/Relation';

export function resolveRelation<T>(entity: Entity, relation: Relation, amount: number): T | T[] {
  const { ManyToMany, OneToMany } = RelationType;
  const { target, type } = relation;
  const options: CreateManyOptions = { skipRelations: true };

  return [OneToMany, ManyToMany].includes(type)
    ? createMany<T>(amount, target, options)
    : create<T>(target, options);
}
