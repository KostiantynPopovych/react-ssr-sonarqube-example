const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const log = require('fancy-log');
// Installed by cypress-coverage
const nyc = require('nyc');

const rootPath = path.join(__dirname, '..');
const cypressCoveragePath = path.join(rootPath, 'coverage/cypress/coverage-final.json');
const jestCoveragePath = path.join(rootPath, 'coverage/jest/coverage-final.json');
const groupedCoveragePath = path.join(rootPath, 'coverage/grouped');
const mergedReportPath = path.join(rootPath, 'coverage/merged-report');

rimraf.sync(groupedCoveragePath);
log('Cleaned grouped coverage path');

rimraf.sync(mergedReportPath);
log('Cleaned merged coverage report path');

fs.mkdirSync(groupedCoveragePath, { recursive: true });
log('Created grouped coverage directory');

fs.copyFileSync(cypressCoveragePath, path.join(groupedCoveragePath, 'cypress-coverage.json'));
log('Copied cypress coverage to grouped coverage directory');

fs.copyFileSync(jestCoveragePath, path.join(groupedCoveragePath, 'jest-coverage.json'));
log('Copied jest coverage to grouped coverage directory');

new nyc({
  reportDir: mergedReportPath,
  tempDir: groupedCoveragePath,
  reporter: ['@lcov-viewer/istanbul-report']
}).report();
log('Generated merged coverage report');
