# Decorate properties

Use `@Seed()` to decorate properties you'd like to set during seeding. 

---

Provide a function returning the value the
property should have after creation. The function is called for each property on each seeded entity so no property on
any seeded entity should be equal unless intended to.

```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;

  @Column()
  @Seed(() => 25)
  public age!: number;
}
```

