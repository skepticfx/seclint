var CLIEngine = require("eslint").CLIEngine;
var default_rules = {
  "jquery-append": 2,
  "jquery-html": 2,
  "window-eval": 2
};



module.exports = {
  lint: function(files, rules){
    if(rules && Object.keys(rules).length === 0){
      rules = default_rules;
    }
    var cli = new CLIEngine({
      useEslintrc: false,
      rulePaths: [__dirname + "/rules"],
      rules: rules
    });
    var report = cli.executeOnFiles(files);
    return report;
  }
};
