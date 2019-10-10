const d3Stack = data => {
	let series = []
	data.forEach(d => {
		let time = new Date(d.time.slice(0, 16) + "Z").getTime()
		let { level, dose } = d
		if (level == null) level = 0
		if (dose == null) dose = 0
		var filter = series.findIndex(s => s.time == time)
		if (filter == -1) {
			series = [...series, { time: new Date(time).getTime(), level, dose }]
		}
		else {
			if( series[filter].level == 0 ) {
				series[filter].level = series[filter - 1].level
			}
		}
	})

	return series.sort((a, b) => a.time > b.time)
}

const shapeArray = data => {
	console.log(data)
	let level = [];
	let dose = [];

	data.forEach( d => {
		if( d.level != null ) {
			level = [ ...level, d.level ]
		}
		else if( d.dose != null ) {
			dose = [ ...dose, d.dose ]
		}
	} )

	return [level, dose]
}

const d = [{ "level": 225, "scale": true, "time": "2019-10-02T21:51:03.557247Z", "trend": 1 }, { "level": 228, "scale": true, "time": "2019-10-02T21:56:03.574842Z", "trend": 2 }, { "level": 253, "scale": true, "time": "2019-10-02T22:01:03.686581Z", "trend": 2 }, { "dose": 0.2, "scale": true, "time": "2019-10-02T22:01:03.698931Z" }, { "level": 200, "scale": true, "time": "2019-10-02T22:06:03.686581Z", "trend": -2 }, { "level": 90, "scale": true, "time": "2019-10-02T22:11:03.686581Z", "trend": -1 }, { "level": 200, "scale": true, "time": "2019-10-02T22:16:03.686581Z", "trend": -2 }, { "dose": 2, "scale": true, "time": "2019-10-02T22:16:03.698931Z" }, { "level": 253, "scale": true, "time": "2019-10-02T22:21:03.686581Z", "trend": 2 }, { "level": 200, "scale": true, "time": "2019-10-02T22:26:03.686581Z", "trend": -2 }, { "level": 90, "scale": true, "time": "2019-10-02T22:31:03.686581Z", "trend": -1 }, { "dose": 20, "scale": true, "time": "2019-10-02T22:31:03.698931Z" }, { "level": 200, "scale": true, "time": "2019-10-02T22:36:03.686581Z", "trend": -2 }, { "level": 90, "scale": true, "time": "2019-10-02T22:41:03.686581Z", "trend": -1 }, { "level": 200, "scale": true, "time": "2019-10-02T22:46:03.686581Z", "trend": -2 }, { "dose": 0.25, "scale": true, "time": "2019-10-02T22:46:03.698931Z" }]

//const s = d3Stack(d.sort((a, b) => new Date(a.time) > new Date(b.time)))
//console.log(JSON.stringify(s))
const r = shapeArray(d)
console.log(r);

//const l = shapeArray( d.sort((a, b) => new Date(a.time).getTime() > new Date(b.time).getTime() ) )
console.log("done");
