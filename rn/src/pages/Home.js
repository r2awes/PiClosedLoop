import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import BG from '../components/BG';
import { BleCm } from '../Bluetooth';

export default class Home extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			level: 0,
			trend: 0,
			targets: [90, 240],
			adj: false
		}
	}
	
	render() {
		return (
			<View style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center"
			}}>
				<BleCm>
					{ ble => <BG {...this.state} /> }
				</BleCm>
				<TouchableNativeFeedback onPress={() => this.setState({trend: Math.floor(Math.random() * 4) - 2})}>
					<Text style={{
						padding: 10,
						backgroundColor: "green",
						position: "fixed",
						bottom: 10,
					}}>Random Trend</Text>
				</TouchableNativeFeedback>
			</View>
		)
	}
}
