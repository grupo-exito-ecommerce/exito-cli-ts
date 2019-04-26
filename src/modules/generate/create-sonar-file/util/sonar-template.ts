export const sonarTemplate = (name: string, version: string, src: string) => {
  return `
sonar.projectKey=${name}
sonar.projectName=${name}
sonar.host.url=http://18.213.20.207/
sonar.login=c234975f7deabc7e40e6dcc4af2e3cfd9168a96e
sonar.verbose=true
sonar.projectVersion=${version}
sonar.sourceEncoding=UTF-8
sonar.sources=${src}
sonar.tests=__tests__
sonar.typescript.tslintconfigpath=tslint.json
# We don't need to exclude it in sonar.sources because it is automatically taken care of
sonar.test.inclusions=__tests__/**/*.spec.js
# Now specify path of lcov and testlog
sonar.typescript.lcov.reportPaths=coverage/lcov.info
    `;
};
