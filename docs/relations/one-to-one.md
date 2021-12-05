# One-to-one

One-to-one relations are seeded like any other property, except that `@Seed()` does not accept any arguments. The
related entity is automatically resolved from the relation.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;

  @OneToOne(() => House, (house) => house.user)
  @JoinColumn()
  @Seed()
  public house!: House;
}
```

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.address.streetName())
  public streetName!: string;

  @OneToOne(() => User, (user) => user.house)
  public user: User;
}
```

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection({ entities: [User, House] });

const users = await forEntity(User).persistMany(2);

// [
//   User {
//     id: 1,
//     name: 'Jack',
//     house: House { id: 1, streetName: 'Willow Avenue' }
//   },
//   User {
//     id: 2,
//     name: 'Bob',
//     house: House { id: 2, streetName: 'Elm Street' }
//   }
// ]
```

Decorating the reverse side of a relation is optional, though encouraged and handy to make sure the relation is seeded
no matter which entity is provided to `forEntity()`.
