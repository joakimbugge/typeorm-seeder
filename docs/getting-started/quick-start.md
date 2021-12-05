# Quick start

## Decorate properties

Decorate entity properties with `@Seed()`. Provide a function returning the value you'd like the property to
have after the entity has been created.

```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;
}
```

## Seed entity

Use `forEntity()` to seed a new entity. The builder returns multiple methods for creating and persisting. Be aware that
relations will be seeded as well, [read more about relations](entity/relations.md).

### Create

Creates and returns one or more entities. The function provided to `@Seed()` will be called for each entity so
no entity will be seeded equal (unless intended to)
.

```typescript
import { forEntity } from '@airhead/typeorm-seeder';

const user = forEntity(User).create();

// User {
//   name: 'Jack'
// }
```

### Persist

Creates and persists one or more entities. A [TypeORM connection](https://typeorm.io/#/connection) is required. Read
more about [multiple connections](../entity/multiple-connections.md).

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection({ entities: [User] });

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack'
// }
```
