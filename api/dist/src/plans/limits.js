"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectiveButtonLimit = effectiveButtonLimit;
exports.effectiveCollaboratorLimit = effectiveCollaboratorLimit;
function effectiveButtonLimit(user) {
    return user.buttonLimitOverride ?? user.plan?.maxButtons ?? 5;
}
function effectiveCollaboratorLimit(company) {
    return company.collaboratorLimitOverride ?? company.plan?.maxCollaborators ?? 1;
}
//# sourceMappingURL=limits.js.map