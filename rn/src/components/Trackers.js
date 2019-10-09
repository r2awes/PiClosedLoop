import React, { Component, Fragment } from 'react';
import { Text, View, Animated, Dimensions } from 'react-native';
import Colors from '../Colors';
import posed from 'react-native-pose';

let width = Dimensions.get("window").width - 40

export class InsulinLeft extends Component {
	constructor(props) {
		super(props)

		this.animatedValue = new Animated.Value(0)
	}

	componentDidMount() {
		this.startAnim()
	}

	startAnim = () => {
		Animated.timing(this.animatedValue, {
			toValue: 1,
			duration: 400
		}).start()
	}

	font = t => {
		if (t > 20) return {
			fontFamily: "Montserrat-Regular",
			color: Colors.e
		}
		else return {
			fontFamily: "Montserrat-Medium",
			color: Colors.b
		}
	}

	render() {
		let { insulinLeft } = this.props;
		let { fontFamily, color } = this.font(insulinLeft)
		return (
			<View style={{
				height: 100,
				width,
				backgroundColor: Colors.d,
				borderRadius: 10,
				justifyContent: "center",
				alignItems: "center",
			}}>
				<Animated.View
					style={{
						height: 100,
						width: this.animatedValue.interpolate({
							inputRange: [0, 1],
							outputRange: [0, ((width * insulinLeft) / 300)]
						}),
						borderRadius: 10,
						backgroundColor: Colors.c,
						position: "absolute",
						left: 0
					}}
				/>
				<Text style={{
					fontSize: 20,
					color,
					fontFamily,
					position: "absolute",
					top: 40,
				}}>{insulinLeft} u</Text>
			</View>
		)
	}
}

const rad = 100;

export class BG extends Component {

	font = (level, targets) => {
		if (level >= targets[0] && level < targets[1]) {
			return {
				fontFamily: "Montserrat-Regular",
				color: Colors.c
			}
		}
		else if (level >= targets[1]) {
			return {
				fontFamily: "Montserrat-Medium",
				color: Colors.b
			}
		}
		else {
			return {
				fontFamily: "Montserrat-Thin",
				color: Colors.b
			}
		}
	}

	render() {
		let { level, targets, trend } = this.props;
		let { fontFamily, color } = this.font(level, targets)
		return (
			<View style={{
				alignItems: "center",
				justifyContent: "center",
			}}>
				<View style={{
					borderRadius: 1000,
					height: rad * 2,
					width: rad * 2,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: Colors.a,
					zIndex: 2
				}}>
					<Text style={{
						fontSize: 60,
						color,
						fontFamily,
					}}>{level}</Text>
					<Text style={{
						fontSize: 20,
						color,
						fontFamily,
					}}>mg/dl</Text>
				</View>
				<TrendRing {...{ trend }} initialPose="0" />
			</View>
		)
	}
}

const TrendRing = ({ trend, initialPose }) => {
	let pose = `${trend * 45}`

	return (
		<Fragment>
			<View style={{
				backgroundColor: Colors.d,
				borderRadius: 1000,
				width: rad * 2.25,
				height: rad * 2.25,
				zIndex: 0,
				position: "absolute"
			}} />
			<TrendCircle {...{ pose, initialPose }} />
		</Fragment>
	)
}

class TrendCircle extends Component {
	render() {
		let { pose, initialPose } = this.props
		return (
			<View
				{...{ pose, initialPose }}
				style={{
					height: rad * .1,
					width: rad * 2.2,
					position: "absolute",
					zIndex: 2,
					alignItems: "flex-end",
					right: -11.25,
					borderRadius: 1000,
				}}
			>
				<View style={{
					width: rad * .1,
					height: rad * .1,
					backgroundColor: Colors.c,
					borderRadius: 1000,
				}} />
			</View>
		)
	}
}

TrendCircle = posed(TrendCircle)({
	"90": {
		rotate: "-90deg",
		transition: { type: 'spring', stiffness: 100 }
	},
	"45": {
		rotate: "-45deg",
		transition: { type: 'spring', stiffness: 100 }
	},
	"0": {
		rotate: "0deg",
		transition: { type: 'spring', stiffness: 100 }
	},
	"-45": {
		rotate: "45deg",
		transition: { type: 'spring', stiffness: 100 }
	},
	"-90": {
		rotate: "90deg",
		transition: { type: 'spring', stiffness: 100 }
	}
})