var CLIEngine = require("eslint").CLIEngine;

var cli = new CLIEngine({
  useEslintrc: false,
  rulePaths: [__dirname + "/rules"],
  rules: {
    "jquery-append": 2,
    "jquery-html": 2,
    "window-eval": 2
  }
});

module.exports = {
  lint: function(files){
    var report = cli.executeOnFiles(files);
    return report;
  }
};
