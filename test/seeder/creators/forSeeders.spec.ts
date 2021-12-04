import { forSeeders } from '../../../src';
import { CircularSeederDependencyError } from '../../../src/errors';
import { FirstSeederCircularMock } from '../mocks/circular/FirstSeederCircularMock';
import { SecondSeederCircularMock } from '../mocks/circular/SecondSeederCircularMock';

describe(forSeeders.name, () => {
  it('throws error on circular dependencies', async () => {
    await expect(
      async () => await forSeeders([FirstSeederCircularMock, SecondSeederCircularMock]).run(),
    ).rejects.toThrowError(CircularSeederDependencyError);
  });
});
