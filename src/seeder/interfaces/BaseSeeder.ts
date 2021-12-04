export interface BaseSeeder {
  seed(): unknown | Promise<unknown>;
}
