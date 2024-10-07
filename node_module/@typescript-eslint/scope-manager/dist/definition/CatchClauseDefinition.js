"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchClauseDefinition = void 0;
const DefinitionBase_1 = require("./DefinitionBase");
const DefinitionType_1 = require("./DefinitionType");
class CatchClauseDefinition extends DefinitionBase_1.DefinitionBase {
    constructor(name, node) {
        super(DefinitionType_1.DefinitionType.CatchClause, name, node, null);
    }
    isTypeDefinition = false;
    isVariableDefinition = true;
}
exports.CatchClauseDefinition = CatchClauseDefinition;
//# sourceMappingURL=CatchClauseDefinition.js.map