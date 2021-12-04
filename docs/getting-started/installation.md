# Installation

## Install

The package is available on [npm](https://www.npmjs.com/) and can be installed using your preferred tool.

```bash
npm install @airhead/typeorm-seeder
```

[TypeORM](https://www.npmjs.com/package/typeorm) is a peer-dependency and has to be installed separately.

## Enable decorators

Ensure decorators are enabled. This should already be the case if you've been using TypeORM. In your `tsconfig.json`,
make sure the following options are enabled.

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```
