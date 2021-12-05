# Many-to-many

Many-to-many relations are seeded like any other property, except that `@Seed()` lets you control the number of related
entities created using the `amount` option. Related entities are automatically resolved from the relation.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;

  @ManyToMany(() => House, (house) => house.users)
  @JoinTable()
  @Seed({ amount: 2 })
  public houses!: House[];
}
```

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.address.streetName())
  public streetName!: string;

  @ManyToMany(() => User, (user) => user.houses)
  public users!: User[];
}
```

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection();

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack',
//   houses: [
//     House { id: 1, streetName: 'Willow Avenue' },
//     House { id: 2, streetName: 'Elm Street' }
//   ]
// },
```

Decorating the reverse side of a relation is optional, though encouraged and handy to make sure the relation is seeded
no matter which entity is provided to `forEntity()`.
