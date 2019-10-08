import React from 'react';
import { SafeAreaView, StatusBar, Dimensions } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/pages/Home';
import Bolus from './src/pages/Bolus';
import Records from './src/pages/Records';
import Settings from './src/pages/Settings';
import Setup from './src/pages/Setup';

import { Bluetooth } from './src/Bluetooth'
import Colors from './src/Colors';
import Header from './src/components/Header';

const { height } = Dimensions.get("window");

const AppStack = createStackNavigator({
	Home,
	Bolus,
	Records,
	Settings
}, {
	cardStyle: {
		backgroundColor: Colors.a,
	},
	defaultNavigationOptions: {
		header: p => <Header {...p}/>,
	}
});

const AppFlow = createAppContainer(
	createSwitchNavigator({
		AppStack,
		Setup,
	})
);

const App = () => (
	<Bluetooth>
		<StatusBar backgroundColor={Colors.a}/>
		<SafeAreaView style={{
			flex: 1,
		}}>
			<AppFlow />
		</SafeAreaView>
	</Bluetooth>
);

export default App;
