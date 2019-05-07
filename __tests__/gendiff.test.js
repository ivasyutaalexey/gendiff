import gendiff from '../src';

const fs = require('fs');

test('gendiff json', () => {
  const diff = gendiff(
    'C:\\IdeaProjects\\gendiff\\__tests__\\__fixtures__\\file1.json',
    'C:\\IdeaProjects\\gendiff\\__tests__\\__fixtures__\\file2.json',
  );

  const result = fs.readFileSync('C:\\IdeaProjects\\gendiff\\__tests__\\__fixtures__\\diff.txt', 'utf8');
  expect(diff).toBe(result);
});
