# Inherited entity

Seeding [entity with inheritance](https://typeorm.io/#/entity-inheritance) is much like seeding an entity the usual way. Decorate the parent the way you'd normally
decorate the actual entity.

## Concrete table inheritance

```typescript
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

export abstract class BaseEntity {
  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;

  @Column()
  @Seed(() => faker.datatype.number())
  public age!: string;
}
```

```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.address.streetName())
  public streetName!: string;
}
```

```typescript
import { forEntity } from '@airhead/typeorm-seeder';
import { User } from './entities/User';

const user = forEntity(User).create();

// User {
//   name: 'John'
//   age: 32
//   streetName: 'Willow Avenue'
// }
```

## Single table inheritance

Coming soon™
