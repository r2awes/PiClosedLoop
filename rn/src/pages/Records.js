import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BleCx } from '../Bluetooth';
import Colors from '../Colors';
import posed from 'react-native-pose';
import { Graph } from '../components/Trackers';
import { AllListItem as AllLI, AllList as AllL } from '../components/Lists';
import { SegConSlider as SCS, SegConText } from '../components/Interacts';
export default class Records extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: true,
			data: [],
			follow: 0,
			show: 1
		}
	}

	static contextType = BleCx;

	async componentDidMount() {
		let raw = await this.context.getBGRecord()
		let data = [ ...raw.bg, ...raw.adjustments ]
		data = data.sort((a, b) => new Date(a.time) > new Date(b.time))
		this.setState({ data })
	}

	render() {
		let { data, follow, show } = this.state;
		return (
			<View style={{
				flex: 1,
				alignItems: "center",
				padding: 20,
				paddingTop: 40
			}}>
				<Graph {...{data, follow, show}} />
				<View style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginVertical: 20,
					height: 40,
					borderRadius: 10,
					borderWidth: 1,
					borderColor: Colors.c,
				}}>
					<SegConText list={show == 0} text="Levels" onPress={() => this.setState({ show: 0 })} />
					<SegConText list={show == 1} text="Both" onPress={() => this.setState({ show: 1})} />
					<SegConText list={show == 2} text="Doses" onPress={() => this.setState({ show: 2 })} />
					<SegConSlider initialPose="list" pose={show+""} />
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
					}}>level</Text>
					<Text style={{
						color: Colors.c,
						fontSize: 16,
						fontFamily: "Montserrat-Thin",
					}}>time</Text>
				</View>
				<AllList
					pose="open"
					initialPose="closed"
					onScroll={({nativeEvent}) => this.setState({follow: nativeEvent.contentOffset.y / nativeEvent.contentSize.height})}
					renderItem={({ item }) => <AllListItem pose="open" initialPose="closed" targets={this.context.targets} {...item} />}
					{...{ data }}
				/>
			</View>
		)
	}
}

const AllList = posed(AllL)({
	closed: {
		y: '100%'
	},
	open: {
		y: 0
	}
})

const AllListItem = posed(AllLI)({
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
	"0": {
		x: -100,
		transition: { type: 'spring', stiffness: 100 }
	},
	"1": {
		x: 0,
		transition: { type: 'spring', stiffness: 100 }
	},
	"2": {
		x: 100,
		transition: { type: 'spring', stiffness: 100 }
	}
})