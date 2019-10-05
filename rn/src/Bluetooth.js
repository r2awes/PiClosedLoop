import React, { Component, createContext } from 'react';

export const BleCx = createContext({
	level: 0,
	trend: 0,
	targets: [0, 0],
	getSettings: null,
	setSettings: null,
	getBGRecord: null,
	setBGRecord: null,
})

export const BleCm = BleCx.Consumer;

export class Bluetooth extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			level: 0,
			trend: 0,
			targets: [0, 0],
			getSettings: this.getSettings,
			setSettings: this.setSettings,
			getBGRecord: this.getBGRecord,
			setBGRecord: this.setBGRecord,
		}
	}
	
	getSettings = () => {
		return {
			"version": 1,
			"bolus": {
				"carbUnits": true,
				"carbRatios": [
					[0, 0, 10],
					[5, 30, 8],
					[10, 0, 10]
				],
				"bgUnits": true,
				"bgTargets": [90, 110],
				"activeInsulinTime": 3,
				"scrollRate": 0.1
			},
			"basal": [
				[0, 0, 1.2]
			],
			"biometrics": {
				"height": 165,
				"weight": 65,
				"sensitivity": [
					[0, 0, 40],
					[21, 0, 80]
				]
			},
			"recordInterval": 24
		}
	}

	getBGRecord = () => {
		return {
			"version": 1,
			"start": "2019-10-02T21:51:03.558572Z",
			"end": "2019-10-03T21:51:03.558577Z",
			"bg": [
				{
					"time": "2019-10-02T21:51:03.557247Z",
					"level": 225,
					"scale": true,
					"trend": 1
				},
				{
					"time": "2019-10-02T21:56:03.574842Z",
					"level": 228,
					"scale": true,
					"trend": 2
				},
				{
					"time": "2019-10-02T22:01:03.686581Z",
					"level": 253,
					"scale": true,
					"trend": 2
				}
			],
			"adjustments": [
				{
					"time": "2019-10-02T22:01:03.698931Z",
					"dose": -0.2,
					"scale": true
				}
			],
			"cdc": 2.5
		}
	}
	
	setSettings = setting => {
		var val = this.getSettings()
		return { ...val, ...setting }
	}

	setBGRecord = bg => {
		var val = this.getBGRecord()
		val.bg.push(bg)
		return val
	}

	render() {
		return (
			<BleCx.Provider value={this.state}>
				{this.props.children}
			</BleCx.Provider>
		)
	}
}
