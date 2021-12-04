import { BaseSeeder } from '../interfaces/BaseSeeder';

export type SeederConstructor<T = BaseSeeder> = new (...args: unknown[]) => T;
