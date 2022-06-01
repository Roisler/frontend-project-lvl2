install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff:
	node bin/gendiff.js
test:
	npx jest
tcoverage:
	npx jest --coverage