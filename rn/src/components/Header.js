import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../Colors'

export default class Header extends Component {
	render() {
		return (
			<View style={{
				flexDirection: "row",
				justifyContent: "center",
				paddingTop: 20
			}}>
				<Text style={{
					fontFamily: "Montserrat-Regular",
					color: Colors.c,
					fontSize: 20
				}}>PiClosedLoop</Text>
			</View>
		)
	}
}
