import fs from 'fs';
import yaml from 'js-yaml';

const isObjectHasProperty = (context, property) => Object.prototype.hasOwnProperty.call(context, property);

export default (filePath1, filePath2) => {
  const yamlBefore = yaml.safeLoadAll(fs.readFileSync(filePath1, 'utf8'))[0];
  const yamlAfter = yaml.safeLoadAll(fs.readFileSync(filePath2, 'utf8'))[0];
  const mergedObject = { ...yamlBefore, ...yamlAfter };
  const result = ['{\n'];

  Object.keys(mergedObject).forEach((key) => {
    if (isObjectHasProperty(yamlBefore, key) && isObjectHasProperty(yamlAfter, key)) {
      if (yamlBefore[key] === yamlAfter[key]) {
        result.push(`    ${key}: ${yamlAfter[key]}\n`);
      } else {
        result.push(`  - ${key}: ${yamlBefore[key]}\n`);
        result.push(`  + ${key}: ${yamlAfter[key]}\n`);
      }
    }

    if (isObjectHasProperty(yamlBefore, key) && !isObjectHasProperty(yamlAfter, key)) {
      result.push(`  - ${key}: ${yamlBefore[key]}\n`);
    }

    if (!isObjectHasProperty(yamlBefore, key) && isObjectHasProperty(yamlAfter, key)) {
      result.push(`  + ${key}: ${yamlAfter[key]}\n`);
    }
  });

  result.push('}');
  return result.join('');
};
