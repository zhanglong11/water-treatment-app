import React, {useState, useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {TabBar, Toast} from '@ant-design/react-native';
import Home from './Home';
import EquipView from './EquipView';
import EquipNav from './EquipNav';
import Mine from './Mine';
import Iconfont from './components/IconBasic';
import Orientation from 'react-native-orientation';

const Nav = props => {
    const [curKey, setCurKey] = useState('home');
    let lastBackPressed = null;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
        };
    }, []);

    const onBackAndroid = () => {
        if (global.currentState.routes.length === 2) {
            if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                BackHandler.exitApp();
                return false;
            }
            lastBackPressed = Date.now();
            Toast.info('再按一次退出', 1, undefined, false);
            return true;
        }
        return false;
    };


    const changeTab = key => {
        if (key == 'equipView') {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
        setCurKey(key);
        // if(key=='equipView'){
        //     props.navigation.navigate('EquipView');
        // }
    };

    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="#f5f5f5"
        >
            <TabBar.Item
                title="首页"
                icon={<Iconfont name="home" color={curKey === 'home' ? '#33A3F4' : '#949494'} size={25}/>}
                selected={curKey === 'home'}
                onPress={() => {
                    changeTab('home');
                }}
            >
                <Home navigation={props.navigation}/>
            </TabBar.Item>
            <TabBar.Item
                icon={<Iconfont name="dingwei" color={curKey === 'equipNav' ? '#33A3F4' : '#949494'} size={25}/>}
                title="设备导航"
                selected={curKey === 'equipNav'}
                onPress={() => {
                    changeTab('equipNav');
                }}
            >
                <EquipNav navigation={props.navigation}/>
            </TabBar.Item>
            <TabBar.Item
                icon={<Iconfont name="eye" color={curKey === 'equipView' ? '#33A3F4' : '#949494'} size={25}/>}
                title="设备可视化"
                selected={curKey === 'equipView'}
                onPress={() => {
                    changeTab('equipView');
                }}
            >
                <EquipView navigation={props.navigation}/>
            </TabBar.Item>
            <TabBar.Item
                icon={<Iconfont name="user" color={curKey === 'mine' ? '#33A3F4' : '#949494'} size={25}/>}
                title="我的"
                selected={curKey === 'mine'}
                onPress={() => {
                    changeTab('mine');
                }}
            >
                <Mine navigation={props.navigation}/>
            </TabBar.Item>
        </TabBar>);
};

export default Nav;
