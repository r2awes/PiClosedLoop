import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import BG from '../components/BG';
import { BleCx } from '../Bluetooth';
import { Button, Snackbar } from 'react-native-paper';

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			level: 0,
			trend: 0,
			targets: [70, 240],
			adj: false
		}
	}
	
	static contextType = BleCx;

	render() {
		return (
			<View style={{
				flex: 1,
				alignItems: "center",
				padding: 20
			}}>
				<BG {...this.context} />
				<TouchableNativeFeedback onPress={() => this.context.setCx({trend: this.context.trend + 1})}>
					<Text style={{
						padding: 10,
						backgroundColor: "green",
						position: "absolute",
						bottom: 10
					}}>Random Trend</Text>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback onPress={() => this.context.setCx({level: Math.floor(Math.random() * 400)})}>
					<Text style={{
						padding: 10,
						backgroundColor: "green",
						position: "absolute",
						bottom: 50
					}}>Random Level</Text>
				</TouchableNativeFeedback>
			</View>
		)
	}
}
