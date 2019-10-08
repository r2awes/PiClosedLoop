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
	let t = new Date(time)
	return t.toTimeString().slice(0, 5)
}

class BGListItem extends Component {
	render() {
		let { level, time, targets, trend, pose, dose } = this.props;
		let date = formatDate(time)
		let color = bgColor(level, targets);
		return (
			<View
				{...{ pose }}
				style={{
					backgroundColor: Colors.c,
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
						color: dose ? Colors.c : color,
						fontSize: 20,
						marginRight: dose ? null : 20
					}}>{level || dose}</Text>
					{ dose ? null : <RenderTrend {...{ trend, color, size: 20 }} />}
				</View>
				<Text style={{
					fontFamily: "Montserrat-Medium",
					color: Colors.a,
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
				style={{flex: 1, width: "100%", height: 260}}
			/>
		)
	}
}

export {
	BGListItem,
	BGList
}