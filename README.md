<h1 align='center'>
    @airhead/typeorm-seeder
</h1>

<p align='center'>
<img src='https://img.shields.io/github/v/release/joakimbugge/typeorm-seeder?include_prereleases' alt='Latest release' />
<img src='https://img.shields.io/github/license/joakimbugge/typeorm-seeder' alt='License' />
<img src='https://img.shields.io/github/workflow/status/joakimbugge/typeorm-seeder/Verify%20&%20Release' alt='Build status' />
<img src='https://img.shields.io/github/issues-pr/joakimbugge/typeorm-seeder' alt='Open pull requests' />
<img src='https://img.shields.io/github/issues/joakimbugge/typeorm-seeder' alt='Open issues' />
</p>

<p align='center'>Seed <a href='https://github.com/typeorm/typeorm'>TypeORM</a> entities decoratively</p>

<hr style='border: 2px solid gray' />

## Prerequisites

Enable decorators in `tsconfig.json`

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

## Install

```bash
npm install @airhead/typeorm-seeder
```

[TypeORM](https://github.com/typeorm/typeorm) is a peer-dependency.

## Quick start

### Entities

```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name!: string;
}
```

```typescript
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection({ entities: [User] });

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack'
// }
```


### Seeders

```typescript
import { Seeder, BaseSeeder } from '@airhead/typeorm-seeder';

@Seeder({ runsBefore: [SomeOtherSeeder] })
export class UserSeeder implements BaseSeeder {
  public async seed(): Promise<User[]> {
    await createConnection({ entities: [User] });
    
    return forEntity(User).persistMany(5);
  }
}
```

```typescript
import { createConnection } from 'typeorm';
import { forSeeders } from '@airhead/typeorm-seeder';

await forSeeders([UserSeeder, SomeOtherSeeder]).run();
```
