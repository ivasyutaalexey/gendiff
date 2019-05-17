start:
    npx babel-node src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json -f json

build:
    NODE_ENV=production babel src --out-dir dist --source-maps inline

lint:
    npx eslint .

lint-fix:
    npx eslint . --fix

make test
    npm test