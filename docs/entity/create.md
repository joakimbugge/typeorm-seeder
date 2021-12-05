# Create

Use `forEntity()` and provide the entity you'd like to seed.

## Single entity

To seed a single entity, call `create()`.

```typescript
import { forEntity } from '@airhead/typeorm-seeder';
import { User } from './entities/User';

const user = forEntity(User).create();

// User {
//   name: 'Jack',
//   age: 25 
// }
```

## Multiple entities

To seed more than one entity, call `createMany()`.

```typescript
import { forEntity } from '@airhead/typeorm-seeder';
import { User } from './entities/User';

const users = forEntity(User).createMany(3);

// [
//   User {
//     name: 'Jack',
//     age: 25 
//   },
//   User {
//     name: 'John',
//     age: 25 
//   },
//   User {
//     name: 'Brad'
//     age: 25 
//   }
// ]
```
