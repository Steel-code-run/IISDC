export function sampleRange(min: number = 0, max: number = 1) {
	return min + Math.floor(Math.random() * (max - min + 1));
}
