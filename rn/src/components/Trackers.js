import React, { Component, Fragment } from 'react';
import { Text, View, Animated, Dimensions, ScrollView } from 'react-native';
import Colors from '../Colors';
import posed from 'react-native-pose';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

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

const shapeArray = data => {
	let level = [];
	let dose = [];

	data.forEach(d => {
		if (d.level != null) {
			level = [...level, d.level]
		}
		else if (d.dose != null) {
			dose = [...dose, d.dose]
		}
	})

	return [level, dose]
}

const chart = {
	width: 2 * width,
	height: 300,
} 

const chartWrap = { position: "absolute", height: 300, width: chart.width }

export class Graph extends Component {
	constructor(props) {
		super(props)

		this.scroll;
	}

	shouldComponentUpdate = (nP, nS) => {
		let { follow, show } = this.props;
		if( nP.follow != follow || nP.show != show ) {
			if (this.scroll) this.scroll.scrollTo({ y: 0, x: follow * (width + 40) })
			return true
		}
		return false
	}
	
	render() {
		let { data, show } = this.props
		var series = shapeArray(data)
		return (
			<ScrollView 
				horizontal
				style={{borderRadius: 10, flex: 1, width: width + 40}}
				ref={ r => this.scroll = r }
				scrollEnabled={false}
			>
				<View style={chartWrap}>
					<AreaChart
						style={{...chart, opacity: show <= 1 ? 1 : 0}}
						data={series[0]}
						contentInset={{ left: -1, top: 10, bottom: 0 }}
						curve={shape.curveMonotoneX}
						svg={{ fill: Colors.rgb(Colors.c + "2e"), stroke: Colors.c }}
					/>
				</View>
				<AreaChart
					style={{ ...chart, opacity: show >= 1 ? 1 : 0 }}
					data={series[1]}
					contentInset={{ left: -1, top: 10, bottom: 0 }}
					curve={shape.curveMonotoneX}
					svg={{ fill: Colors.rgb(Colors.e + "2e"), stroke: Colors.e }}
				/>
			</ScrollView>
		)
	}
}