import { intersection } from 'lodash';

export function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(routes, role) {
  return routes.filter(({ permission }) => {
    if (!permission) return true;
    if (!isArrayWithLength(permission)) return true;
    return intersection(permission, [role]).length;
  });
}
