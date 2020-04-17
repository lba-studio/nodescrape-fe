/**
 * computes the color hex based on the passed in ratio (so something like #0101ff)
 * @param ratio a number from -1 to 1
 */
export default function(ratio: number): string {
  if (ratio < -1 || ratio > 1) {
    throw new Error(`Cannot compute hex of ratio that is smaller than 1 or larger than 1. Ratio: ${ratio}`);
  }
  // so this is out of 100%
  let outputHex: string = '';
  let hex = '';
  if (ratio > 0) {
    hex = (128 - Math.min(64, Math.floor(64 * ratio * 2)) - 63).toString(16).padStart(2, '0');
    outputHex = `#${hex}ff${hex}`;
  } else if (ratio < 0) {
    hex = (128 - Math.min(128, Math.floor(64 * Math.abs(ratio) * 4))).toString(16).padStart(2, '0');
    outputHex = `#ff${hex}${hex}`
  } else {
    outputHex = '#ffffff'
  }
  return outputHex;
}