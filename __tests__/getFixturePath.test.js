import { fileURLToPath } from 'url';
import path from 'path';
import getFixturePath from '../src/getFixturePath.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('getFixturePath', () => {
  expect(getFixturePath('file.json')).toEqual(path.join(__dirname, '..', '__fixtures__', 'file.json'));
  expect(getFixturePath('')).toEqual(path.join(__dirname, '..', '__fixtures__'));
});
