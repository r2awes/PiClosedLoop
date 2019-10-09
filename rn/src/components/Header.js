import React, { Component, Fragment } from 'react';
import { Text, ScrollView, View } from 'react-native';
import Colors from '../Colors';
import posed from 'react-native-pose';
import ViewPagerAndroid from '@react-native-community/viewpager';
export default class Header extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			index: 0
		}
	}
	
	changePage = index => {
		const pages = [
			"Home",
			"Dose",
			"Records",
			"Settings"
		]
		this.setState({index})
		this.props.navigation.navigate(pages[index])
	}
	

	render() {
		let {index} = this.state
		return (
			<ViewPagerAndroid
				style={{
					flexDirection: "row",
					backgroundColor: Colors.a
				}}
				keyboardDismissMode="on-drag"
				onPageSelected={({nativeEvent}) => this.changePage(nativeEvent.position)}
			>
				<MenuButton route="Home" pose={index == 0 ? "here" : "else"} />
				<MenuButton route="Dose" pose={index == 1 ? "here" : "else"} />
				<MenuButton route="Records" pose={index == 2 ? "here" : "else"} />
				<MenuButton route="Settings" pose={index == 3 ? "here" : "else"} />
			</ViewPagerAndroid>
		)
	}
}

class MenuButton extends Component {
	render() {
		let {route, pose} = this.props;
		return (
			<Text
				{...{pose}}
				initialPose="else"
				style={{
					fontFamily: "Montserrat-Regular",
					fontSize: 40,
					paddingTop: 20,
					paddingLeft: 20,
					borderRadius: 10,
					margin: 10,
					backgroundColor: Colors.d,
					color: Colors.c
				}}
			>{route}</Text>
		)
	}
}

MenuButton = posed(MenuButton)({
	here: {
		opacity: 1
	},
	else: {
		opacity: 0.2
	}
})