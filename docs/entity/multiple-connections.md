# Multiple connections

TypeORM allows you to provide the same entity to [multiple connections](https://typeorm.io/#/multiple-connections)
simultaneously. Normally, we can get the connection from the entity, but that's difficult when the entity is
provided to more than one connection. To be explicit about which connection to use, provide the connection
to `forEntity()`.

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

const firstConnection = await createConnection({ entities: [User] });
const secondConnection = await createConnection({ entities: [User] });

const firstUser = await forEntity(User, firstConnection).persist();

// User {
//   id: 1,
//   name: 'Jack',
//   age: 25
// }

const secondUser = await forEntity(User, secondConnection).persist();

// User {
//   id: 1,
//   name: 'John',
//   age: 25
// }
```
