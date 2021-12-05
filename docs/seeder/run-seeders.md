# Run seeders

Use the `forSeeders()` builder to run seeders.

```typescript
import { createConnection } from 'typeorm';
import { forSeeders } from '@birdbrain/typeorm-seeder';
import { UserSeeder } from './seeders/UserSeeder';
import { HouseSeeder } from './seeders/HouseSeeder';

await createConnection();

await forSeeders([UserSeeder, HouseSeeder]).run();
```
