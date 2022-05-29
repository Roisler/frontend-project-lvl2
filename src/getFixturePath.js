import { cwd } from 'process';
import { resolve } from 'path';

const getFixturePath = (filename) => resolve(cwd(filename), './__fixtures__/', filename);

export default getFixturePath;
