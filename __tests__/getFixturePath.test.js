import getFixturePath from '../src/getFixturePath.js';

test('getFixturePath', () => {
  expect(getFixturePath('file.json')).toEqual('/home/roisler/frontend-project-lvl2/__fixtures__/file.json');
  expect(getFixturePath('')).toEqual('/home/roisler/frontend-project-lvl2/__fixtures__');
});
