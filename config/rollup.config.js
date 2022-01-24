import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
// import packageJson from '../package.json';

/** @typedef {import('rollup').RollupOptions} RollupOptions */

/** @type {RollupOptions} */
const config = {
  // input: 'src/index.ts',
  input: 'src',
  // input: { },
  external: [/node_modules/, /^node:/,],
  output: [
    {
      // file: 'dist/cjs/index.js',
      dir: 'dist/cjs',
      interop: 'auto',
      format: 'cjs',
      sourcemap: false,
    },
    // {
    //   file: 'dist/es/index.js',
    //   interop: 'auto',
    //   format: 'es',
    //   exports: 'named',
    //   sourcemap: false,
    // },
  ],
  plugins: [
    // @ts-ignore peerDepxExternal is typed wrong
    /** @type {Plugin} */ peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: 'config/tsconfig.build.json', }),
    json(),
  ],
};

/** @type {RollupOptions[]} */
export default [config,];
