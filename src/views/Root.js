import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './Home';
import EquipView from './EquipView';
import EquipNav from './EquipNav';
import Mine from './Mine';
import Iconfont from './components/IconBasic'

export default createBottomTabNavigator(
    {
        Home,
        EquipNav,
        EquipView,
        Mine
    },
    {
        defaultNavigationOptions: ({navigation}) => {
            const {routeName}=navigation.state;
          return ({
              title:routeName=='Home'?'首页':routeName=='EquipNav'?'设备导航':routeName=='EquipView'?'设备可视化':'我的',
              tabBarIcon: ({focused, horizontal,tintColor }) => {
                  let iconName;
                  if (routeName === 'Home') {
                      iconName = `home`;
                  } else if (routeName === 'EquipNav') {
                      iconName = `dingwei`;
                  } else if (routeName === 'EquipView') {
                      iconName = `eye`;
                  } else if (routeName === 'Mine') {
                      iconName = `user`;
                  }
                  return <Iconfont name={iconName} size={25} color={tintColor}/>;
              },
          })
        },
        tabBarOptions: {
            activeTintColor: '#3E7AFF',
            inactiveTintColor: '#BFBFBF',
        },
    },
);
