const scanner = require('sonarqube-scanner')
const { config } = require('dotenv');

config();

scanner(
  {
    serverUrl : process.env.SONAR_SERVER_URL,
    token :  process.env.SONAR_LOGIN_TOKEN,
  },
  () => process.exit()
)
