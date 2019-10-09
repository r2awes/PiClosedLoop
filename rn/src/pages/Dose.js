import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { InsulinLeft } from '../components/Trackers';
import { AdjListItem as ALI, AdjList as AL } from '../components/Lists';
import { Button } from '../components/Interacts'
import { BleCx } from '../Bluetooth';
import Colors from '../Colors';
import posed from 'react-native-pose';

export default class Dose extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			insulinLeft: 200,
			data: []
		}
	}
	
	static contextType = BleCx;

	async componentDidMount() {
		let data = await this.context.getBGRecord()
		let insulinLeft = (data.cdc - 2.5) * (30)
		data = data.adjustments
		this.setState({ data, insulinLeft })
	}

	changeSite = () => {
		console.log("hi")
	}
	
	render() {
		let {insulinLeft, data} = this.state;
		return (
			<View 
				style={{
					flex: 1,
					padding: 20,
				}}
				contentContainerStyle={{
					alignItems: "center",
				}}
			>
				<InsulinLeft {...{insulinLeft}} />
				<View style={{ padding: 5 }} />
				<Button text="Change Site" onPress={this.changeSite}/>
				<View style={{ padding: 5 }} />
				<Button text="Give Insulin" onPress={this.changeSite} />
				<View style={{ padding: 5 }} />
				<View style={{
					flexDirection: "row",
					paddingHorizontal: 20,
					width: "100%",
					marginBottom: 10,
					justifyContent: "space-between"
				}}>
					<Text style={{
						color: Colors.c,
						fontSize: 16,
						fontFamily: "Montserrat-Thin",
					}}>dosage</Text>
					<Text style={{
						color: Colors.c,
						fontSize: 16,
						fontFamily: "Montserrat-Thin",
					}}>time</Text>
				</View>
				<AdjList
					pose="open"
					initialPose="closed"
					renderItem={({ item }) => <AdjListItem pose="open" initialPose="closed" {...item} />}
					{...{ data }}
				/>
			</View>
		)
	}
}

const AdjList = posed(AL)({
	closed: {
		y: '100%'
	},
	open: {
		y: 0
	}
})

const AdjListItem = posed(ALI)({
	closed: {
		opacity: 0,
		x: "100%",
	},
	open: {
		x: 0,
		opacity: 1
	},
	entered: {
		y: 10,
		opacity: 1
	}
})
