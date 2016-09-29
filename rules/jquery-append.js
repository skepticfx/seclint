/**
 * @fileoverview Rule to flag use of alert, confirm, prompt
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const getPropertyName = require("../lib/ast-utils").getStaticPropertyName;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks if the given name is a prohibited identifier.
 * @param {string} name The name to check
 * @returns {boolean} Whether or not the name is prohibited.
 */
function isAppend(name) {
  return name === "append";
}


"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  return {
    "CallExpression": function (node) {
      const callee = node.callee;
      if (callee.type === "MemberExpression") {
        const identifierName = getPropertyName(callee);

        if (isAppend(identifierName)) {
          context.report(node, "Possible use of jQuery.append: ");
        }
      }
    }
  };

};
