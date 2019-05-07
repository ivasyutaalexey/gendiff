import fs from 'fs';
import ini from 'ini';

const isObjectHasProperty = (context, property) => Object.prototype.hasOwnProperty.call(context, property);

export default (filePath1, filePath2) => {
  const iniBefore = ini.parse(fs.readFileSync(filePath1, 'utf8'));
  const iniAfter = ini.parse(fs.readFileSync(filePath2, 'utf8'));
  const mergedObject = { ...iniBefore, ...iniAfter };

  const result = ['{\n'];

  Object.keys(mergedObject).forEach((key) => {
    if (isObjectHasProperty(iniBefore, key) && isObjectHasProperty(iniAfter, key)) {
      if (iniBefore[key] === iniAfter[key]) {
        result.push(`    ${key}: ${iniAfter[key]}\n`);
      } else {
        result.push(`  - ${key}: ${iniBefore[key]}\n`);
        result.push(`  + ${key}: ${iniAfter[key]}\n`);
      }
    }

    if (isObjectHasProperty(iniBefore, key) && !isObjectHasProperty(iniAfter, key)) {
      result.push(`  - ${key}: ${iniBefore[key]}\n`);
    }

    if (!isObjectHasProperty(iniBefore, key) && isObjectHasProperty(iniAfter, key)) {
      result.push(`  + ${key}: ${iniAfter[key]}\n`);
    }
  });

  result.push('}');
  return result.join('');
};
