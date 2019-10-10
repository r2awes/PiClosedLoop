import React, {Component} from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Colors'

const bgColor = (level, targets) => {
	if (level >= targets[0] && level < targets[1]) return Colors.c
	else if (level >= targets[1]) return Colors.b
	else return Colors.b
}

const RenderTrend = ({ trend, color, size }) => {
	if( trend == 2 ) {
		return <Icon name="chevron-double-up" {...{color, size}} />
	}
	else if( trend == 1 ) {
		return <Icon name="chevron-up" {...{color, size}} />
	}
	else if( trend == 0 ) {
		return <Icon name="chevron-right" {...{color, size}} />
	}
	else if( trend == -1 ) {
		return <Icon name="chevron-down" {...{color, size}} />
	}
	else if( trend == -2 ) {
		return <Icon name="chevron-double-down" {...{color, size}} />
	}
	else {
		console.log("error: ", trend)
		return <Text>error</Text>
	}
}

const formatDate = time => {
	const month = t => {
		return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][ t.getMonth()]
	}
	let t = new Date(time)
	
	return t.getDate() + " " + month(t) + ", " + t.toTimeString().slice(0, 5)
}

class BGListItem extends Component {
	render() {
		let { level, time, targets, trend, pose } = this.props;
		let date = formatDate(time)
		let color = bgColor(level, targets);
		return (
			<View
				{...{ pose }}
				style={{
					backgroundColor: Colors.d,
					borderRadius: 10,
					height: 75,
					paddingHorizontal: 20,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between"
				}}
			>
				<View style={{
					flexDirection: "row",
					paddingHorizontal: 10,
					paddingVertical: 5,
					borderRadius: 10,
					backgroundColor: Colors.a
				}}>
					<Text style={{
						fontFamily: "Montserrat-Regular",
						color: color,
						fontSize: 20,
					}}>{level}</Text>
					<RenderTrend {...{ trend, color, size: 20 }} />
				</View>
				<Text style={{
					fontFamily: "Montserrat-Medium",
					color: Colors.c,
					fontSize: 18
				}}>{date}</Text>
			</View>
		)
	}
}

class BGList extends Component {
	render() {
		let { pose, initialPose, data, renderItem } = this.props;
		return (
			<FlatList
				{...{data, renderItem, pose, initialPose}}
				keyExtractor={item => `bg-${item.time}`}
				ItemSeparatorComponent={() => <View style={{paddingTop: 5}}/>}
				style={{flex: 1, width: "100%"}}
			/>
		)
	}
}

class AdjListItem extends Component {
	render() {
		let { time, pose, dose } = this.props;
		let date = formatDate(time)
		return (
			<View
				{...{ pose }}
				style={{
					backgroundColor: Colors.d,
					borderRadius: 10,
					height: 75,
					paddingHorizontal: 20,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between"
				}}
			>
				<View style={{
					flexDirection: "row",
					paddingHorizontal: 10,
					paddingVertical: 5,
					borderRadius: 10,
					backgroundColor: Colors.a
				}}>
					<Text style={{
						fontFamily: "Montserrat-Regular",
						color: Colors.c,
						fontSize: 20,
						marginRight: dose ? null : 20
					}}>{dose}</Text>
				</View>
				<Text style={{
					fontFamily: "Montserrat-Medium",
					color: Colors.c,
					fontSize: 18
				}}>{date}</Text>
			</View>
		)
	}
}

class AdjList extends Component {
	render() {
		let { pose, initialPose, data, renderItem } = this.props;
		return (
			<FlatList
				{...{ data, renderItem, pose, initialPose }}
				keyExtractor={item => `adj-${item.time}`}
				ItemSeparatorComponent={() => <View style={{ paddingTop: 5 }} />}
				style={{ flex: 1, width: "100%" }}
			/>
		)
	}
}

class AllList extends Component {
	render() {
		let { pose, initialPose, data, renderItem, onScroll } = this.props;
		return (
			<FlatList
				{...{ data, renderItem, pose, initialPose, onScroll }}
				scrollEventThrottle={75}
				keyExtractor={item => `${item.dose ? "adj" : "bg"}-${item.time}`}
				ItemSeparatorComponent={() => <View style={{ paddingTop: 5 }} />}
				style={{ flex: 1, width: "100%" }}
			/>
		)
	}
}

class AllListItem extends Component {
	render(){
		let {dose} = this.props;
		if(dose) return <AdjListItem {...this.props}/>
		else return <BGListItem {...this.props}/>
	}
}

export {
	BGListItem,
	AdjListItem,
	AllListItem,
	AllList
}