export default {
	a: "#20232A",
	b: "#E02229",
	c: "#93A1C2",
	d: "#1B1E24",
	e: "#EBEBEB",
	rgb: c => {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
}