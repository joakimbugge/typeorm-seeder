import { SeedCallback, SeedOptions } from '../decorators/Seed';
import { Entity } from '../models/Entity';

export interface SeedPropertyOptions {
  callback: SeedCallback;
  options: SeedOptions;
}

export abstract class SeedStore {
  private static store: Map<Entity, Record<any, SeedPropertyOptions>> = new Map();

  public static get<T>(entity: Entity<T>): Record<keyof T | string, SeedPropertyOptions> {
    return this.getInheritedOptions(entity) || getDefaultOptions();
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

  private static getInheritedOptions<T>(
    entity: Entity<T>,
  ): Record<keyof T | string, SeedPropertyOptions> {
    const options = new Map<string, SeedPropertyOptions>();

    const getOptionsFromParent = (parentEntity: Entity): void => {
      const parentOptions = this.store.get(parentEntity);

      if (parentOptions) {
        Object.keys(parentOptions).forEach((option) => options.set(option, parentOptions[option]));
        getOptionsFromParent(Object.getPrototypeOf(parentEntity));
      }
    };

    getOptionsFromParent(entity);

    return <Record<keyof T | string, SeedPropertyOptions>>Object.fromEntries(options);
  }
}

function getDefaultOptions(): Record<string, SeedPropertyOptions> {
  return {};
}
