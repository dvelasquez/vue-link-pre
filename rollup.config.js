import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import PKG_JSON  from './package.json';

const INPUT_FILE = 'src/index.ts';
const OUTPUT_DIR = 'dist';

const formats = [
  { dist: 'umd', ts: 'es5', ext: 'umd' },
  { dist: 'es', ts: 'esnext', ext: 'esm' },
];

export default formats.map((format) => ({
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: { compilerOptions: { target: format.ts } },
    }),
  ],
  input: INPUT_FILE,
  external: [
    ...Object.keys(PKG_JSON.dependencies || {}),
    ...Object.keys(PKG_JSON.peerDependencies || {}),
  ],
  output: {
    file: path.join(OUTPUT_DIR, `index.${format.ext}.js`),
    format: format.dist,
    sourcemap: true,
    name: PKG_JSON.name,
    exports: 'named',
  },
}));
