import fs from 'fs';
import gendiff from '../src';

test.each([
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'tree'],
  ['yml', 'tree'],
  ['ini', 'tree'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
])(
  'gendiff %s --format %s',
  (fileExtension, outputFormat) => {
    const diff = gendiff(
      `__tests__/__fixtures__/before.${fileExtension}`,
      `__tests__/__fixtures__/after.${fileExtension}`,
      outputFormat,
    );

    let result;
    if (outputFormat === 'json') {
      result = JSON.parse(fs.readFileSync(`__tests__/__fixtures__/diff-${outputFormat}.json`, 'utf8'));
    } else {
      result = fs.readFileSync(`__tests__/__fixtures__/diff-${outputFormat}.txt`, 'utf8');
    }

    expect(diff).toStrictEqual(result);
  },
);
