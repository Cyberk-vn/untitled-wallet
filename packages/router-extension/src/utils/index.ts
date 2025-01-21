/**
 * getTitanExtensionRouterId returns the `window.titanExtensionRouterId`.
 * If the `window.titanExtensionRouterId` is not initialized, it will be initialized and returned.
 */
export function getTitanExtensionRouterId(): number {
  if (globalThis.titanExtensionRouterId == null) {
    globalThis.titanExtensionRouterId = Math.floor(
      Math.random() * Number.MAX_SAFE_INTEGER
    );
  }
  return globalThis.titanExtensionRouterId;
}
