/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider} from '@ant-design/react-native';
import routers from  './src/router';

const AppNavigator = createStackNavigator(routers)
const AppContainer = createAppContainer(AppNavigator)
const App = () => {
    const handleNavigationChange=(prevState,newState)=>{
        global.currentState = newState;
    }
    return (
        <Provider>
            <AppContainer  onNavigationStateChange={handleNavigationChange}/>
        </Provider>
    );
};
export default App;
