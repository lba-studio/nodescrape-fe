/**
 * computes the color hex based on the passed in ratio (so something like #0101ff)
 * thanks to https://gist.github.com/mlocati/7210513 
 * @param ratio a number from -1 to 1
 */
export default function(ratio: number): string {
  const perc = (ratio + 1) / 2 * 100
  var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}