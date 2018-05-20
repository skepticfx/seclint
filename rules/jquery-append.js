/**
 * @fileoverview Rule to flag use of jQuery.append()
 * @author Nafeez
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const getPropertyName = require('../lib/utils').getStaticPropertyName

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if the given name is the required identifier.
 * @param {string} name The name to check
 * @returns {boolean} Whether or not the name is prohibited.
 */
function isAppend (name) {
  return name === 'append'
}

function isDynamicArgument (args) {
  if (args.length === 0) return false
  for (var x of args) {
    if (x.type === 'Literal') {
      return false
    }
  }
  return true
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      const callee = node.callee
      if (callee.type === 'MemberExpression') {
        const identifierName = getPropertyName(callee)
        if (isAppend(identifierName) && isDynamicArgument(node.arguments)) {
          context.report(node, 'Possible use of jQuery.append()')
        }
      }
    }
  }
}
