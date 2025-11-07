/**
 * Return numeric user id resolved from routeUserId (string) or selectedUserId (number)
 * Returns null when none is available.
 */
export function resolveUserId(routeUserId, selectedUserId) {
  const n = Number(routeUserId)
  if (!Number.isNaN(n) && n > 0) return n
  return selectedUserId || null
}
