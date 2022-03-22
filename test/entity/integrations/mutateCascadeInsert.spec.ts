import { DataSource } from 'typeorm';
import { mutateCascadeInsert } from '../../../src/entity/integrations/mutateCascadeInsert';
import {
  createInMemoryDataSource,
  removeInMemoryDatabase,
} from '../../utils/createInMemoryDataSource';
import { ManyToOneSecondChildEntityMock } from '../mocks/relations/many-to-one/ManyToOneSecondChildEntityMock';
import { ManyToOneChildEntityMock } from '../mocks/relations/many-to-one/ManyToOneChildEntityMock';
import { ManyToOneParentEntityMock } from '../mocks/relations/many-to-one/ManyToOneParentEntityMock';

describe(mutateCascadeInsert.name, () => {
  let dataSource: DataSource;

  afterEach(() => removeInMemoryDatabase(dataSource));

  it('sets isCascadeInsert on all relations', async () => {
    const entities = [
      ManyToOneParentEntityMock,
      ManyToOneChildEntityMock,
      ManyToOneSecondChildEntityMock,
    ];

    dataSource = await createInMemoryDataSource(entities);

    entities.forEach((entity) => {
      mutateCascadeInsert(entity, dataSource);

      const relationsMetadata = dataSource.getMetadata(entity).relations;

      relationsMetadata.forEach((relationMetadata) => {
        expect(relationMetadata.isCascadeInsert).toBeTruthy();
        expect(relationMetadata.inverseRelation?.isCascadeInsert).toBeTruthy();
      });
    });
  });
});
