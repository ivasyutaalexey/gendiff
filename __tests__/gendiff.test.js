import gendiff from '../src';

const fs = require('fs');

test('gendiff json', () => {
  const diff = gendiff(
    '__tests__/__fixtures__/json/before.json',
    '__tests__/__fixtures__/json/after.json',
  );

  const result = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8');
  expect(diff).toBe(result);
});

test('gendiff yaml', () => {
  const diff = gendiff(
    '__tests__/__fixtures__/yaml/before.yml',
    '__tests__/__fixtures__/yaml/after.yml',
  );

  const result = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8');
  expect(diff).toBe(result);
});

test('gendiff ini', () => {
  const diff = gendiff(
    '__tests__/__fixtures__/ini/before.ini',
    '__tests__/__fixtures__/ini/after.ini',
  );

  const result = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8');
  expect(diff).toBe(result);
});
