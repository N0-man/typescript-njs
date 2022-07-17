import njs from './njs';

describe('testing jest on typescript', () => {
  test('return value', () => {
    expect(njs.testFunction()).toBe('test');
  });
});
