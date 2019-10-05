import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/pages/Home';
import Bolus from './src/pages/Bolus';
import Records from './src/pages/Records';
import Settings from './src/pages/Settings';
import Setup from './src/pages/Setup';

import { Bluetooth } from './src/Bluetooth'

const AppStack = createStackNavigator({
	Home,
	Bolus,
	Records,
	Settings
});

const AppFlow = createAppContainer(createSwitchNavigator({
	AppStack,
	Setup,
}));

const App = () => (
	<Bluetooth>
		<AppFlow />
	</Bluetooth>
);

export default App;
