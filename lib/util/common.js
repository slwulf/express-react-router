export function hasAnyKeys(obj, ...keys) {
  return keys.some(key => obj.hasOwnProperty(key))
}

export function hasKeys(obj, ...keys) {
  return keys.every(key => obj.hasOwnProperty(key))
}
