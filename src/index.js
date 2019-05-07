const fs = require('fs');

const isObjectHasProperty = (context, property) => Object.prototype.hasOwnProperty.call(context, property);

export default (filePath1, filePath2) => {
  const jsonBefore = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
  const jsonAfter = JSON.parse(fs.readFileSync(filePath2, 'utf8'));
  const mergedObject = { ...jsonBefore, ...jsonAfter };
  const result = ['{\n'];

  Object.keys(mergedObject).forEach((key) => {
    if (isObjectHasProperty(jsonBefore, key) && isObjectHasProperty(jsonAfter, key)) {
      if (jsonBefore[key] === jsonAfter[key]) {
        result.push(`    ${key}: ${jsonAfter[key]}\n`);
      } else {
        result.push(`  - ${key}: ${jsonBefore[key]}\n`);
        result.push(`  + ${key}: ${jsonAfter[key]}\n`);
      }
    }

    if (isObjectHasProperty(jsonBefore, key) && !isObjectHasProperty(jsonAfter, key)) {
      result.push(`  - ${key}: ${jsonBefore[key]}\n`);
    }

    if (!isObjectHasProperty(jsonBefore, key) && isObjectHasProperty(jsonAfter, key)) {
      result.push(`  + ${key}: ${jsonAfter[key]}\n`);
    }
  });

  result.push('}');

  return result.join('');
};
