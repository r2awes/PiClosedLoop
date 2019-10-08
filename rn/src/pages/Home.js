import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BG from '../components/BG';
import { BleCx } from '../Bluetooth';
import Colors from '../Colors';
import posed from 'react-native-pose';
import { BGListItem as BGLI, BGList as BGL } from '../components/Lists';
import { SegConText, SegConSlider as SCS } from '../components/SegCon';

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: true,
			data: []
		}
	}
	
	static contextType = BleCx;

	async componentDidMount() {
		let data = await this.context.getBGRecord()
		data = data.bg.slice(1, 5)
		this.setState({data})
	}

	render() {
		let { list, data } = this.state;
		return (
			<View style={{
				flex: 1,
				alignItems: "center",
				padding: 20
			}}>
				<BG {...this.context} />
				<View style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginVertical: 40,
					height: 40,
					borderRadius: 10,
					borderWidth: 1,
					borderColor: Colors.c,
				}}>
					<SegConText {...{ list }} text="List" initialPose="true" onPress={() => this.setState({ list: true })} />
					<SegConText {...{ list: !list }} text="Graph"  onPress={() => this.setState({ list: false })}/>
					<SegConSlider initialPose="list" pose={list ? "list" : "graph"}/>
				</View>
				<View style={{
					flexDirection: "row",
					paddingHorizontal: 20,
					marginBottom: 10,
					width: "100%",
					justifyContent: "space-between"
				}}>
					<Text style={{
						color: Colors.c,
						fontSize: 16,
						fontFamily: "Montserrat-Thin",
					}}>level / dosage</Text>
					<Text style={{
						color: Colors.c,
						fontSize: 16,
						fontFamily: "Montserrat-Thin",
					}}>time</Text>
				</View>
				<BGList 
					pose="open" 
					initialPose="closed"
					renderItem={({ item }) => <BGListItem pose="open" initialPose="closed" targets={this.context.targets} {...item} />}
					{...{data}}
				/>
			</View> 	
		)
	}
}

const BGList = posed(BGL)({
	closed: {
		y: '100%'
	},
	open: {
		y: 0
	}
})

const BGListItem = posed(BGLI)({
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

const SegConSlider = posed(SCS)({
	"list": {
		x: -50,
		transition: { type: 'spring', stiffness: 100 }
	},
	"graph": {
		x: 50,
		transition: { type: 'spring', stiffness: 100 }
	}
})