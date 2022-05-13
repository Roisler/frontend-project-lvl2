import { cwd } from 'process';
import { resolve } from 'path';

const getFixturePath = (filename) => resolve(cwd(filename), './__tests__/__fixtures__/', filename);

export default getFixturePath;
