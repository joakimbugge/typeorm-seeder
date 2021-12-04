import { mutateCascadeInsert } from '../../../src/entity/integrations/mutateCascadeInsert';
import { createInMemoryDatabase, removeInMemoryDatabase } from '../../utils/createInMemoryDatabase';
import { ManyToOneSecondChildEntityMock } from '../mocks/relations/many-to-one/ManyToOneSecondChildEntityMock';
import { ManyToOneChildEntityMock } from '../mocks/relations/many-to-one/ManyToOneChildEntityMock';
import { ManyToOneParentEntityMock } from '../mocks/relations/many-to-one/ManyToOneParentEntityMock';

describe(mutateCascadeInsert.name, () => {
  afterEach(() => removeInMemoryDatabase());

  it('sets isCascadeInsert on all relations', async () => {
    const entities = [
      ManyToOneParentEntityMock,
      ManyToOneChildEntityMock,
      ManyToOneSecondChildEntityMock,
    ];
    const connection = await createInMemoryDatabase(entities);

    entities.forEach((entity) => {
      mutateCascadeInsert(entity, connection);

      const relationsMetadata = connection.getMetadata(entity).relations;

      relationsMetadata.forEach((relationMetadata) => {
        expect(relationMetadata.isCascadeInsert).toBeTruthy();
        expect(relationMetadata.inverseRelation?.isCascadeInsert).toBeTruthy();
      });
    });
  });
});
