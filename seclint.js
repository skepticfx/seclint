#!/usr/bin/env node
var linter = require('./linter');
var chalk = require('chalk');

var rules = {};

if(process.argv.indexOf('--eval') !== -1){
  console.log('Enabling Eval rules ...');
  rules["window-eval"] = 2;
  process.argv.splice(process.argv.indexOf('--eval'), 1);
}

if(process.argv.indexOf('--jquery') !== -1){
  console.log('Enabling jQuery rules ...');
  rules["jquery-append"] = 2;
  rules["jquery-html"] = 2;
  process.argv.splice(process.argv.indexOf('--jquery'), 1);
}

if(process.argv.length <= 2){
  printHelp();
}

// Get all options from the command line
var files = process.argv.splice(2);
var results = linter.lint(files, rules).results;
results.forEach(function(result){
    if( (result.errorCount + result.warningCount) > 0){
      console.log('\n\n' + chalk.black.bgWhite.bold('File: ' + result.filePath));
      result.messages = groupByRule(result.messages);
      Object.keys(result.messages).forEach(function(ruleId){
        console.log('\n'+chalk.blue.bgYellow.bold(ruleId + ':') + ' ' + result.messages[ruleId].description);
        result.messages[ruleId].items.forEach(function(item){
          console.log(' -- Line: ' + item.line + ' - ' + item.source.trim() );
        });
      });
    }
});


function printHelp(){
  console.log("Usage: ");
  console.log("  seclint filename.js");
  console.log("  seclint jsfolder/");
  console.log("  Options: ");
  console.log("           --eval - Only use the eval rule  ");
  console.log("           --jquery - Only use the jquery rules  ");
  process.exit(0);
}

/**
 * Given a list of message objects, group them by the 'ruleId'
 * @param results
 */

function groupByRule(results){
  var grouped = {};
  results.forEach(function(result){
    if(!grouped.hasOwnProperty(result.ruleId)){
      grouped[result.ruleId] = {
        'name': result.ruleId,
        'description': result.message,
        'items': []
      };
    }
    grouped[result.ruleId].items.push(result);
  });
  return grouped;
}