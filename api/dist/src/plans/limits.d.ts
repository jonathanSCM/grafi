export declare function effectiveButtonLimit(user: {
    buttonLimitOverride: number | null;
    plan: {
        maxButtons: number;
    } | null;
    company?: {
        plan: {
            maxButtons: number;
        } | null;
    } | null;
}): number;
export declare function effectiveCollaboratorLimit(company: {
    collaboratorLimitOverride: number | null;
    plan: {
        maxCollaborators: number;
    } | null;
}): number;
