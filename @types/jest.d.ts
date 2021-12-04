import 'jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObject<E extends Record<string, unknown>>(expected: E): R;
    }
  }
}
