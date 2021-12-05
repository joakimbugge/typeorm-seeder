# Many-to-one

Many-to-one relations are seeded like any other property, except that `@Seed()` does not accept any arguments. The
related entity is automatically resolved from the relation.

Be aware that a new entity on the reverse side of the many-to-one relation will be created for each seeded entity,
making this relation behave almost like a [one-to-one](./one-to-one.md) relation during seeding. It may be easier to
seed the other way around ([one-to-many](./one-to-many.md)) or by using Seeders.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.address.streetName())
  public streetName!: string;

  @ManyToOne(() => User, (user) => user.houses)
  @Seed()
  public user!: User;
}
```

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;

  @OneToMany(() => House, (house) => house.user)
  public houses!: House[];
}
```

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection({ entities: [House, User] });

const user = await forEntity(House).persist();

// House {
//   id: 1,
//   streetName: 'Willow Avenue',
//   user: User { id: 1, name: 'John' }
// }
```

Decorating the reverse side of a relation is optional, though encouraged and handy to make sure the relation is seeded
no matter which entity is provided to `forEntity()`.
