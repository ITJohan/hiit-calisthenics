/** @returns {value is Category} */
export function isCategory(/** @type {any} */ value) {
  return (
    value === "shoulder-warmup" || value === "spine-warmup" ||
    value === "wrist-warmup" || value === "core-warmup" ||
    value === "back-warmup" || value === "hold-warmup" ||
    value === "squat-warmup" || value === "hinge-warmup" ||
    value === "pull-up" || value === "squat" || value === "dip" ||
    value === "hinge" || value === "row" || value === "push-up" ||
    value === "anti-extension" || value === "anti-rotation" ||
    value === "extension"
  );
}
