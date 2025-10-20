// RBAC Configuration
export const ROLES = {
  ADMIN: 'ADMIN',
  FINANCE: 'FINANCE',
  SCHEDULER: 'SCHEDULER',
  SUPPORT_WORKER: 'SUPPORT_WORKER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type Permission = {
  resources: readonly string[];
  actions: readonly string[];
};

export const ROLE_PERMISSIONS: Record<Role, Permission> = {
  [ROLES.ADMIN]: {
    resources: ['*'], // All resources
    actions: ['*'], // All actions
  },
  [ROLES.FINANCE]: {
    resources: ['claims', 'finance', 'reports'],
    actions: ['read', 'write', 'approve'],
  },
  [ROLES.SCHEDULER]: {
    resources: ['schedules', 'appointments', 'clients'],
    actions: ['read', 'write'],
  },
  [ROLES.SUPPORT_WORKER]: {
    resources: ['clients', 'notes', 'basic_reports'],
    actions: ['read', 'write'],
  },
};

export const checkPermission = (userRole: Role, resource: string, action: string): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole];
  if (!permissions) return false;

  // Admin has all permissions
  if (permissions.resources.includes('*') || permissions.actions.includes('*')) {
    return true;
  }

  return permissions.resources.includes(resource) && permissions.actions.includes(action);
};

// Hierarchical permissions helper
export const hasRole = (userRole: Role, requiredRole: Role): boolean => {
  const hierarchy = {
    [ROLES.ADMIN]: 4,
    [ROLES.FINANCE]: 3,
    [ROLES.SCHEDULER]: 2,
    [ROLES.SUPPORT_WORKER]: 1,
  };

  return hierarchy[userRole] >= hierarchy[requiredRole];
};
