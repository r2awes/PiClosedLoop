import React, { Component, Fragment } from 'react';
import { Text, View, Animated } from 'react-native';
import Colors from '../Colors';
import posed from 'react-native-pose';

const rad = 100;

export default class BG extends Component {
	
	font = (level, targets) => {
		if( level >= targets[0] && level < targets[1]) {
			return { 
				fontFamily:"Montserrat-Regular", 
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
		let {fontFamily, color} = this.font(level, targets)
		return (
			<View style={{
				marginTop: 20,
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
				<TrendRing {...{trend}}/>
			</View>
		)
	}
}

const TrendRing = ({trend}) => {
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
			}}/>
			<TrendCircle {...{pose}}/>
		</Fragment>
	)
}

class TrendCircle extends Component {
	render() {
		let {pose} = this.props
		return (
			<View
				{ ...{pose} }
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
				}}/>
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