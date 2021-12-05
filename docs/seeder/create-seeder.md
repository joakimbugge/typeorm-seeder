# Create seeder

Use seeders to easily organize seeding and separate concerns.

## Simple seeder

A seeder is a class decorated with `@Seeder()`. Use the `BaseSeeder` interface to construct seeders appropriately.

```typescript
import { Seeder, BaseSeeder } from '@birdbrain/typeorm-seeder';
import { User } from './entities/User';

@Seeder()
export class UserSeeder implements BaseSeeder {
  public seed(): Promise<User[]> {
    return forEntity(User).persistMany(5);
  }
}
```

## Dependencies

The order in which seeders run may be important to you. To control the order, use the `runsBefore` and `runsAfter`
options to make sure the seeders run consecutively.

```typescript
import { Seeder, BaseSeeder } from '@birdbrain/typeorm-seeder';
import { UserSeeder } from './seeders/UserSeeder';
import { House } from './entities/House';

@Seeder({ runsAfter: [UserSeeder] })
export class HouseSeeder implements BaseSeeder {
  public seed(): Promise<User[]> {
    return forEntity(House).persistMany(5);
  }
}
```

Dependent seeders run consecutively, while independent seeders, meaning seeders controlled neither directly nor
indirectly through `@Seeder()`, runs concurrently.

The final and exact order in which independent seeders run may be controlled by the order they are provided
to `runSeeders()`, but the run order should be arbitrary.
