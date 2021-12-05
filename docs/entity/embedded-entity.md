# Embedded entities

When using TypeORM's [embedded entities](https://typeorm.io/#/embedded-entities), decorate the properties of the
embedded entity and the entity itself.

```typescript
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

export class Name {
  @Column()
  @Seed(() => faker.name.firstName())
  public first!: string;

  @Column()
  @Seed(() => faker.name.lastName())
  public last!: string;
}
```

```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import { Name } from './embeds/Name';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column(() => Name)
  @Seed()
  public name!: Name;
}
```

```typescript
import { forEntity } from '@airhead/typeorm-seeder';
import { User } from './entities/User';

const user = forEntity(User).create();

// User {
//   name: {
//     first: 'Jack',
//     last: 'Smith'
//   }
// }
```

There's support for nested embedded entities.
