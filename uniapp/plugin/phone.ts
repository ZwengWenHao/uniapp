export function formatPhone(phone: string) {
	return phone.slice(0, 3) + '****' + phone.slice(7);
}

export function formatRange(range:number) {
	if (range > 1) {
		return range.toFixed(2) + 'km';
	} else {
		return Math.round(range * 1000) + 'm';
	}
}