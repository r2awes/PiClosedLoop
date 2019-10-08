import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import Colors from '../Colors'

class SegConText extends Component {
	render() {
		let { text, list, onPress } = this.props;
		return (
			<TouchableNativeFeedback {...{ onPress }}>
				<View style={{
					height: 40,
					justifyContent: "center"
				}}>
					<Text
						style={{
							width: 100,
							borderRadius: 10,
							textAlign: "center",
							zIndex: 1,
							fontFamily: "Montserrat-Regular",
							color: list ? Colors.a : Colors.c
						}}
					>{text}</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}
}

class SegConSlider extends Component {
	render() {
		let { pose, initialPose } = this.props;
		return (
			<View
				{...{ pose, initialPose }}
				style={{
					borderRadius: 10,
					height: 40,
					width: 100,
					zIndex: -1,
					backgroundColor: Colors.c,
					position: "absolute"
				}}
			/>
		)
	}
}

export {
	SegConSlider,
	SegConText
}