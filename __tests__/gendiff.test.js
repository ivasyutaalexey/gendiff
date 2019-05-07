import gendiff from '../src';

const fs = require('fs');

test('gendiff json', () => {
  const diff = gendiff(
    '__tests__/__fixtures__/before.json',
    '__tests__/__fixtures__/after.json',
  );

  const result = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8');
  expect(diff).toBe(result);
});

test('gendiff yaml', () => {
  const diff = gendiff(
    '__tests__/__fixtures__/before.yml',
    '__tests__/__fixtures__/after.yml',
  );

  const result = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8');
  expect(diff).toBe(result);
});
