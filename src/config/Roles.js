/*
 * These are the placeholder roles you can replace these with yours
 */
export const Roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MT_ADMIN: 'MT_ADMIN',
  MT_USER: 'MT_USER',
  SERVICE_USER_1: 'SERVICE_USER_1',
  SERVICE_USER_2: 'SERVICE_USER_2',
  ACADEMIC_ADMIN: 'ACADEMIC_ADMIN',
  ACADEMIC_USER: 'ACADEMIC_USER',
  TELECALL_USER: 'TELECALLER_USER',
  SALES_USER: 'SALES_USER'
};

export const RolesArray = Object.keys(Roles);

export const contractstatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ONGOING: 'ONGOING',
  DONE: 'DONE',
  SUSPENDED: 'SUSPENDED',
  ACCEPTED: 'ACCEPTED'
};

export const contractstatusArray = Object.keys(contractstatus);
