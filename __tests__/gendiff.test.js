import gendiff from '../src';

const fs = require('fs');

test('gendiff json', () => {
  const diff = gendiff(
    '__tests__/__fixtures__/file1.json',
    '__tests__/__fixtures__/file2.json',
  );

  const result = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8');
  expect(diff).toBe(result);
});
