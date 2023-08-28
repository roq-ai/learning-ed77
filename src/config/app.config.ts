interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Customer'],
  tenantRoles: ['Administrator', 'Teacher', 'Course Creator', 'Examiner'],
  tenantName: 'Organization',
  applicationName: 'Learning',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
