import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Dose extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			dosage: 0
		}
	}
	
	render() {
		return (
			<View>
				<Text> textInComponent </Text>
			</View>
		)
	}
}
