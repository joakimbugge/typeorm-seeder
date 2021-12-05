# Persist

Use `forEntity()` and provide the entity you'd like to seed. A [TypeORM connection](https://typeorm.io/#/connection) is
required as well. Make sure the entity you're seeding is provided to the connection and the seeder will automatically
use that connection to save the entity.

To seed and persist a single entity, call `persist()`, which resolved with the saved entity.

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection({ entities: [User] });

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack'
//   age: 25
// }
```

To persist multiple entities, call `persistMany()`.

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection({ entities: [User] });

const users = await forEntity(User).persistMany(3);

// [
//   User {
//     id: 1,
//     name: 'Jack'
//     age: 25
//   }
//   User {
//     id: 2,
//     name: 'John'
//     age: 25
//   }
//   User {
//     id: 3,
//     name: 'Brad'
//     age: 25
//   }
// ]
```

When seeding and persisting, all generated properties (e.g. `@PrimaryGeneratedColumn()`) are set and all event hooks
fire as well.
