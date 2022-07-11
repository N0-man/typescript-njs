import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/njs.ts',
  output: {
    dir: 'dist',
  },
  plugins: [typescript()],
};
