/**
 * Get the viewport width in pixels.
 * @param {number} v The value for which you want to calculate viewport.
 * @returns The viewport width.
 */

function vw(v: number) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
  }

export { vw}