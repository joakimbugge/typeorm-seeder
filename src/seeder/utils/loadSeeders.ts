import * as appRootPath from 'app-root-path';
import * as glob from 'glob';
import { SeederConstructor } from '../models/SeederConstructor';

export function loadSeeders(seederOrPath: SeederConstructor | string): SeederConstructor[] {
  if (typeof seederOrPath !== 'string') {
    return <SeederConstructor[]>[seederOrPath];
  }

  const files = glob.sync(seederOrPath, { root: appRootPath.path });

  return files.map((file) => {
    const exported = appRootPath.require(file);
    return <SeederConstructor>Object.values(exported)[0];
  });
}
