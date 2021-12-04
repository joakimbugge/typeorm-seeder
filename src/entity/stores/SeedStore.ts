import { SeedCallback, SeedOptions } from '../decorators/Seed';
import { Entity } from '../models/Entity';

export interface SeedPropertyOptions {
  callback: SeedCallback;
  options: SeedOptions;
}

export abstract class SeedStore {
  private static store: Map<Entity, Record<any, SeedPropertyOptions>> = new Map();

  public static get<T extends Entity>(entity: T): Record<keyof T | string, SeedPropertyOptions> {
    return this.store.get(entity) || getDefaultOptions();
  }

  public static set<T extends Entity>(
    entity: T,
    property: keyof T,
    options: SeedPropertyOptions,
  ): void {
    const properties = this.store.get(entity);

    this.store.set(entity, {
      ...properties,
      [property]: options,
    });
  }

  public static clear(): void {
    return this.store.clear();
  }
}

function getDefaultOptions(): Record<string, SeedPropertyOptions> {
  return {};
}
