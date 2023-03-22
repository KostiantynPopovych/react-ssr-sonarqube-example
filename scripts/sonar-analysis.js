const scanner = require('sonarqube-scanner')
const { config } = require('dotenv');
const packageJson = require('../package.json');

config();

scanner(
  {
    serverUrl : process.env.SONAR_SERVER_URL,
    token :  process.env.SONAR_LOGIN_TOKEN,
    options : {
      // This is mandatory field
      'sonar.projectKey': `${packageJson.name}:${packageJson.version}`
    }
  },
  () => process.exit()
)
