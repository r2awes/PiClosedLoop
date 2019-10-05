import React, { Component, Fragment } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import { interpolate } from 'flubber';
import { tween, easing } from 'popmotion';
import Svg, { Path, G } from 'react-native-svg';

const paths = [
	"m 22.448558,49.99951 c 7.379734,-0.095 16.706655,-14.4733 16.706655,-14.4733 C 50.645202,21.20177 40.405811,0 22,0 3.5941883,0 -6.6452021,21.20177 4.8447875,35.52621 c 0,0 9.9958555,14.57103 17.6037705,14.4733 z",
	"m 22.448558,49.99951 c 7.379734,-0.095 16.706655,-14.4733 16.706655,-14.4733 C 50.645202,21.20177 40.405811,0 22,0 3.5941883,0 -6.6452021,21.20177 4.8447875,35.52621 c 0,0 9.9958555,14.57103 17.6037705,14.4733 z",
	"M 22,22 M 0,22 a 22,22 0 1 0 44,0 22,22 0 1 0 -44,0",
	"M 22.448558,4.8942785e-4 C 29.828292,0.09548943 39.155213,14.473789 39.155213,14.473789 50.645202,28.798229 40.405811,49.999999 22,49.999999 c -18.4058117,0 -28.6452021,-21.20177 -17.1552125,-35.52621 0,0 9.9958555,-14.57102957 17.6037705,-14.47329957215 z",
	"M 22.448558,4.8942785e-4 C 29.828292,0.09548943 39.155213,14.473789 39.155213,14.473789 50.645202,28.798229 40.405811,49.999999 22,49.999999 c -18.4058117,0 -28.6452021,-21.20177 -17.1552125,-35.52621 0,0 9.9958555,-14.57102957 17.6037705,-14.47329957215 z"
]

export default class BG extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			trend: paths[1]
		}
	}

	componentDidMount() {
		this.morph(this.props.trend + 2)
	}
	
	
	shouldComponentUpdate(nP, nS) {
		if( nP.trend !== this.props.trend || nP.level !== this.props.level ) {
			this.morph(nP.trend + 2)
			return true
		}
		else return false
	}

	fontLevel = (level, targets) => {
		if( level > targets[0] && level < targets[1]) return "Montserrat-Light"
		else if (level > targets[1]) return "Montserrat-Medium"
		else return "Montserrat-Regular"
	}
	
	morph = trend => {
		console.log(trend);
		
		const interpolator = interpolate( this.state.trend, paths[trend], { maxSegmentLength: 2 });
		tween({
			duration: 400,
			ease: easing.easeInOut,
			from: {i:0},
			to: {i:1},
		})
		.pipe(({ i }) => ({ path: interpolator(i) }) )
		.start(({path}) => {
			console.log(path)
			this.setState({trend: path})
		})
	}

	render() {
		let { level, targets } = this.props;
		let fontFamily = this.fontLevel(level, targets);
		const Trend = () => (
			<Svg 
				width={200} height={200} viewBox="0 0 44 50" 
				style={{
					position: "absolute",
					zIndex: -1
				}} 
			>
				<G>
					<Path d={this.state.trend} fill="red"/>
				</G>
			</Svg>
		)
		return (
			<Fragment>
				<View style={{
					borderRadius: 100,
					padding: 20,
					width: 130,
					height: 130,
					backgroundColor: "orange",
					justifyContent: "center",
					alignItems: "center"
				}}>
					<Text style={{
						fontSize: 60,
						fontFamily
					}}>{level}</Text>
					<Text style={{
						fontSize: 20,
						fontFamily
					}}>mg/dl</Text>
				</View>
				<Trend/>
			</Fragment>
		)
	}
}
