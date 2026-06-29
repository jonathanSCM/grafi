export declare function effectiveButtonLimit(user: {
    buttonLimitOverride: number | null;
    plan: {
        maxButtons: number;
    } | null;
}): number;
export declare function effectiveCollaboratorLimit(company: {
    collaboratorLimitOverride: number | null;
    plan: {
        maxCollaborators: number;
    } | null;
}): number;
