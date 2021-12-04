# @birdbrain/typeorm-seeder

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/joakimbugge/typeorm-seeder/Release)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@birdbrain/typeorm-seeder)
![NPM](https://img.shields.io/npm/l/@birdbrain/typeorm-seeder)
![npm (scoped)](https://img.shields.io/npm/v/@birdbrain/typeorm-seeder)

Seed TypeORM entities using decorators.

## Be aware

This project is very much in development. Expect breaking changes between minor versions.

## Table of contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Quick start](#quick-start)
- [Usage](#usage)
    - [Create](#create)
    - [Create and persist](#create-and-persist)
    - [Relations](#relations)
    - [Multiple connections](#multiple-connections)
- [Seeders](#seeders)

## Prerequisites

Make sure decorators are enabled in `tsconfig.json`.

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
npm install @birdbrain/typeorm-seeder
```

[TypeORM](https://github.com/typeorm/typeorm) is a peer-dependency.

## Quick start

Use the `@Seed()` property decorator to generate property values. [Relations](#relations) are seeded the same way.

```ts
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from '@birdbrain/typeorm-seeder';
import * as faker from 'faker';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name: string;
}
```

Create a connection and seed the entity using the `forEntity()` builder.

```ts
import { createConnection } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

await createConnection();

const user = forEntity(User).create();

// User {
//   name: 'Jack'
// }
```

## Usage

### Create

Entities are simply created, seeded and returned.

```ts
import { createConnection, getRepository } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

await createConnection();

const user = forEntity(User).create();

// User {
//   name: 'Jack'
// }

const users = forEntity(User).createMany(2);

// [
//   User {
//     name: 'Jack'
//   },
//   User {
//     name: 'Matt'
//   }
// ]
```

### Create and persist

Entities are created, seeded and persisted in the database. Returns the persisted entities.

```ts
import { createConnection } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

await createConnection();

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack'
// }

const users = await forEntity(User).persistMany(2);

// [
//   User {
//     id: 1,
//     name: 'Jack'
//   },
//   User {
//     id: 2,
//     name: 'Matt'
//   }
// ]
```

### Relations

Relations are seeded like any other property. No callback is needed, the related entity is automatically resolved from
the relation.

Seeding both sides of a relation is optional. It's only required on the entity passed to `forEntity()`.

#### One-to-one

```ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Seed } from '@birdbrain/typeorm-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Seed(() => faker.name.firstName())
  public name: string;

  @OneToOne(() => House, (house) => post.owner)
  @JoinColumn()
  @Seed()
  public house: House;
}
```

```ts
import { Entity, Column, OneToOne } from 'typeorm';
import { Seed } from '@birdbrain/typeorm-seeder';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Seed(() => faker.address.streetName())
  public streetName: string;

  @OneToOne(() => User, (user) => user.house)
  @Seed()
  public owner: User;
}
```

```ts
import { createConnection } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

await createConnection();

const users = await forEntity(User).persistMany(2);

// [
//   User {
//     id: 1,
//     name: 'Jack',
//     house: House { id: 1, streetName: 'Willow Avenue' }
//   },
//   User {
//     id: 2,
//     name: 'Bob',
//     house: House { id: 2, streetName: 'Elm Street' }
//   }
// ]
```

Relations where the join column is on the opposite side of the entry entity will also be seeded.

#### One-to-many, many-to-one, many-to-many

```ts
import { Entity, Column, OneToMany } from 'typeorm';
import { Seed } from '@birdbrain/typeorm-seeder';

@Entity()
export class User {
  @Column()
  @Seed(() => faker.name.firstName())
  public name: string;

  @OneToMany(() => House, (house) => post.owner)
  @Seed({ amount: 2 })
  public houses: House[];
}
```

```ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { Seed } from '@birdbrain/typeorm-seeder';

@Entity()
export class House {
  @Column()
  @Seed(() => faker.address.streetName())
  public streetName: string;

  @ManyToOne(() => User, (user) => user.houses)
  @Seed()
  public owner: User;
}
```

```ts
import { createConnection } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

await createConnection();

const user = await forEntity(User).persist();

// User {
//   id: 1,
//   name: 'Jack',
//   houses: [
//     House { id: 1, streetName: 'Willow Avenue' }
//     House { id: 2, streetName: 'Elm Street' }
//   ]
// },
```

### Multiple connections

If you're using multiple connections, pass the appropriate connection to `forEntity()`.

```ts
import { createConnection } from 'typeorm';
import { forEntity } from '@birdbrain/typeorm-seeder';

const firstConnection = await createConnection();
const secondConnection = await createConnection();

const user = await forEntity(User, firstConnection).persist();
const house = await forEntity(House, secondConnection).persist();
```

## Seeders

Use seeders to easily organize seeding and separate concerns. A seeder is a class decorated with `@Seeder()`. Use
the `BaseSeeder` interface to construct seeders appropriately.

```ts
import { Seeder, BaseSeeder } from '@birdbrain/typeorm-seeder';

@Seeder()
export class UserSeeder implements BaseSeeder {
  constructor() {
  }

  public seed(): Promise<User[]> {
    return forEntity(User).persistMany(5);
  }
}
```

Use options to control the order in which seeders are executed.

```ts
import { Seeder, BaseSeeder } from '@birdbrain/typeorm-seeder';

@Seeder({ runsBefore: [SomeOtherSeeder] })
export class UserSeeder implements BaseSeeder {
  public seed(): Promise<User[]> {
    return forEntity(User).persistMany(5);
  }
}
```

Use the `forSeeders()` builder to run the seeders.

```ts
import { createConnection } from 'typeorm';
import { forSeeders } from '@birdbrain/typeorm-seeder';

await createConnection();

await forSeeders([UserSeeder, SomeOtherSeeder]).run();
```

As in TypeORM, seeders can be loaded by providing paths to the seeder files relative to project root.

```ts
import { createConnection } from 'typeorm';
import { forSeeders } from '@birdbrain/typeorm-seeder';

await createConnection();

await forSeeders(['seeders/*.ts']).run();
```
