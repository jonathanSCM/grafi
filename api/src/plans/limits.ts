export function effectiveButtonLimit(user: {
  buttonLimitOverride: number | null;
  plan: { maxButtons: number } | null;
  company?: { plan: { maxButtons: number } | null } | null;
}): number {
  return user.buttonLimitOverride ?? user.company?.plan?.maxButtons ?? user.plan?.maxButtons ?? 5;
}

export function effectiveCollaboratorLimit(company: {
  collaboratorLimitOverride: number | null;
  plan: { maxCollaborators: number } | null;
}): number {
  return company.collaboratorLimitOverride ?? company.plan?.maxCollaborators ?? 1;
}
