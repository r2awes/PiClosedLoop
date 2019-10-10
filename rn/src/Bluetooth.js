import React, { Component, createContext } from 'react';

export const BleCx = createContext({
	level: 0,
	trend: 0,
	targets: [0, 0],
	getSettings: null,
	setSettings: null,
	getBGRecord: null,
	setBGRecord: null,
	setCx: null
})

export const BleCm = BleCx.Consumer;

export class Bluetooth extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			level: 0,
			trend: 0,
			targets: [70, 240],
			getSettings: this.getSettings,
			setSettings: this.setSettings,
			getBGRecord: this.getBGRecord,
			setBGRecord: this.setBGRecord,
			setCx: cx => this.setState({...cx})
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
		let rec = {
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
				},
				{
					"time": "2019-10-02T22:06:03.686581Z",
					"level": 200,
					"scale": true,
					"trend": -2
				},
				{
					"time": "2019-10-02T22:11:03.686581Z",
					"level": 90,
					"scale": true,
					"trend": -1
				},
				{
					"time": "2019-10-02T22:16:03.686581Z",
					"level": 200,
					"scale": true,
					"trend": -2
				},
				{
					"time": "2019-10-02T22:21:03.686581Z",
					"level": 253,
					"scale": true,
					"trend": 2
				},
				{
					"time": "2019-10-02T22:26:03.686581Z",
					"level": 100,
					"scale": true,
					"trend": -2
				},
				{
					"time": "2019-10-02T22:31:03.686581Z",
					"level": 139,
					"scale": true,
					"trend": -1
				},
				{
					"time": "2019-10-02T22:36:03.686581Z",
					"level": 200,
					"scale": true,
					"trend": -2
				},
				{
					"time": "2019-10-02T22:41:03.686581Z",
					"level": 90,
					"scale": true,
					"trend": -1
				},
				{
					"time": "2019-10-02T22:46:03.686581Z",
					"level": 53,
					"scale": true,
					"trend": -2
				},
			],
			"adjustments": [
				{
					"time": "2019-10-02T22:01:03.698931Z",
					"dose": 1,
					"scale": true
				},
				{
					"time": "2019-10-02T22:16:03.698931Z",
					"dose": 2,
					"scale": true
				},
				{
					"time": "2019-10-02T22:31:03.698931Z",
					"dose": 20,
					"scale": true
				},
				{
					"time": "2019-10-02T22:46:03.698931Z",
					"dose": .25,
					"scale": true
				},
			],
			"cdc": 5
		}
		let {level, trend} = rec.bg.reverse()[0]
		this.setState({level, trend})
		return rec
	}
	
	setSettings = setting => {
		var val = this.getSettings()
		return { ...val, ...setting }
	}

	setBGRecord = bg => {
		var val = this.getBGRecord()
		val.bg = [...val.bg, bg]
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
