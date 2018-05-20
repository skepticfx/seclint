const path = require('path')
const CLIEngine = require('eslint').CLIEngine
const defaultRules = {
  'jquery-append': 2,
  'jquery-html': 2,
  'window-eval': 2
}

module.exports = {
  lint: function (files, rules) {
    if (rules && Object.keys(rules).length === 0) {
      rules = defaultRules
    }
    const cli = new CLIEngine({
      useEslintrc: false,
      rulePaths: [path.join(__dirname, '/rules')],
      rules: rules
    })
    return cli.executeOnFiles(files)
  }
}
