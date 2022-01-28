import tsconfig from '@tsconfig/node14/tsconfig.json';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
    plugins: [
      del({ targets: 'dist/*' }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            module: tsconfig.compilerOptions.target,
          },
        },
      }),
      terser(),
      copy({
        targets: [
          {
            src: 'package.json',
            dest: 'dist',
            transform: (contents) => {
              const json = JSON.parse(contents.toString());

              delete json.scripts;
              delete json.devDependencies;
              delete json['lint-staged'];

              return JSON.stringify(json, null, 2);
            },
          },
          { src: 'README.md', dest: 'dist' },
        ],
      }),
    ],
  },
  {
    input: 'dist/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts' }],
    plugins: [
      dts(),
      del({
        hook: 'buildEnd',
        targets: [
          'dist/**/*',
          '!dist/index.js',
          '!dist/index.d.ts',
          '!dist/README.md',
          '!dist/package.json',
        ],
      }),
    ],
  },
];
