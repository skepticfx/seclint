/**
 * @fileoverview Rule to flag use of window.eval()
 * @author Nafeez
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      const callee = node.callee
      callee && callee.type === 'Identifier' && callee.name === 'eval' && context.report(node, 'Possible use of eval()') // eval()
      callee && callee.type === 'MemberExpression' && callee.property && callee.property.type === 'Identifier' &&
        callee.property.name === 'eval' && context.report(node, 'Possible use of eval()') // window.eval();
    }
  }
}
