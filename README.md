<br />
<br />

<div align='center'>
    <img src='https://github.com/joakimbugge/typeorm-seeder/raw/main/assets/logo.png' alt='Logo' />
    <br /><br /><br />
    <a href='https://www.npmjs.com/package/@airhead/typeorm-seeder'>
        <img src='https://img.shields.io/github/v/release/joakimbugge/typeorm-seeder?include_prereleases' alt='Latest release' />
    </a>
    <a href='https://coveralls.io/github/joakimbugge/typeorm-seeder?branch=main'>
        <img alt="Test coverage" src="https://img.shields.io/coveralls/github/joakimbugge/typeorm-seeder">
    </a>
    <a href='https://github.com/joakimbugge/typeorm-seeder/blob/main/LICENSE'>
        <img src='https://img.shields.io/github/license/joakimbugge/typeorm-seeder' alt='License' />
    </a>
    <img src="https://img.shields.io/librariesio/release/npm/@airhead/typeorm-seeder" alt='Dependencies'>
</div>

<br />

<p align='center'>Seed <a href='https://github.com/typeorm/typeorm'>TypeORM</a> entities decoratively</p>

<br />
<br />

## Installation

```bash
npm install @airhead/typeorm-seeder typeorm
```

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

## Documentation

Coming soon! In the meantime, submit an [issue](https://github.com/joakimbugge/typeorm-seeder/issues).

## Quick start

### Entities

```ts
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@airhead/typeorm-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Seed(() => getRandomName())
  public name!: string;
}
```

```ts
import { createConnection } from 'typeorm';
import { forEntity } from '@airhead/typeorm-seeder';

await createConnection();

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack'
// }
```


### Seeders

```ts
import { Seeder, BaseSeeder } from '@airhead/typeorm-seeder';

@Seeder({ runsBefore: [SomeOtherSeeder] })
export class UserSeeder implements BaseSeeder {
  public seed(): Promise<User[]> {
    return forEntity(User).persistMany(5);
  }
}
```

```ts
import { createConnection } from 'typeorm';
import { forSeeders } from '@airhead/typeorm-seeder';

await createConnection();

await forSeeders([UserSeeder, SomeOtherSeeder]).run();
```

---

<a href="https://www.flaticon.com/free-icons/grow" title="grow icons">Grow icons created by Freepik - Flaticon</a>
