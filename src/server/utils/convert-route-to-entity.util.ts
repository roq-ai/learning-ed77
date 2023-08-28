const mapping: Record<string, string> = {
  certificates: 'certificate',
  courses: 'course',
  exams: 'exam',
  modules: 'module',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
