import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Iconfont from '../../components/IconBasic';
import TabBasic from '../../components/TabBasic';
import EquipCard from './EquipCard';
import EquipList from './EquipList';
import MonitorData from './EquipChart';
import EquipStatusCard from './EquipStatusCard';
import EquipStatusList from './EquipStatusList';

const data = [
    {id: 1, name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', total: 1.32, unit: 'm', status: 1},
    {id: 2, name: '二个和尚挑水喝', total: 2.32, unit: 'm', status: 2},
    {id: 3, name: '三个和尚挑水喝', total: 3.32, unit: 'm', status: 1},
    {id: 4, name: '四个和尚挑水喝', total: 4.32, unit: 'm', status: 2},
    {id: 5, name: '五个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', total: 1.32, unit: 'm', status: 1},
    {id: 6, name: '一个和尚挑水喝', total: 5.32, unit: 'km', status: 1},
    {id: 7, name: '一个和尚挑水喝', total: 6.32, unit: 'm', status: 2},
    {id: 8, name: '八个和尚挑水喝', total: 1.32, unit: 'h', status: 1},
    {id: 9, name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', total: 1.32, unit: 'm', status: 1},
    {id: 10, name: '十个和尚挑水喝', total: 7.32, unit: 'c', status: 1},
    {id: 11, name: '一个和尚挑水喝', total: 1.32, unit: 'm', status: 2},
    {id: 12, name: '三个和尚挑水喝', total: 1.32, unit: 'cc', status: 1},
];
const title = [
    {title: '监控数据', id: 1},
    {title: '设备状态', id: 2},
];
const EquipTab = props => {
    const {navigation} = props;
    const name = navigation.getParam('name');

    const [dataList, setDataList] = useState(data);
    const [isList, setList] = useState(true);
    const [curTitle, setCurTitle] = useState(0);
    // const [tabTitle,setTabTitle]=useState(title);
    // const [showTab, setShowTab] = useState(title);
    const [showMore, setShowMore] = useState(null);

    // const initData = () => {
    //     if (showId.length) {
    //         setShowTab([...tabTitle.filter(l => showId.includes(l.id))]);
    //     } else {
    //         setShowTab([...tabTitle]);
    //     }
    // };
    //
    // useEffect(() => {
    //     initData();
    // }, [showId]);

    const goBack = () => {
        navigation.goBack();
    };

    const chooseValue = () => {
        Alert.alert('选亚索');
    };

    // const chooseProject = () => {
    //     props.navigation.push('EquipChooseTab', {tabTitle, setShowId, showId});
    // };

    const title = [
        {title: '监控数据'},
        {title: '设备状态'},
    ];

    const changeTab = (item, i) => {
        setCurTitle(i);
    };


    const left = <TouchableOpacity onPress={goBack}><Iconfont name={'jiantou'} size={24}
                                                              color={'#fff'}/></TouchableOpacity>;


    return (<View style={styles.wrapper}>
        <Header left={left} title={name}/>

        <View style={styles.searchWrapper}>
            <SearchBar placeholder={'输入项目名称'} placeholderTextColor={'#8C98B7'} wrapperStyle={styles.search}
                       style={styles.searchInput}/>
            <View style={styles.searchIcon}>
                {curTitle ? null : <TouchableOpacity onPress={() => {
                    setShowMore(!showMore);
                }}>
                    <Text style={styles.searchName}>多值</Text>
                </TouchableOpacity>}

                <TouchableOpacity onPress={() => {
                    setShowMore(null);
                    setList(!isList);
                }}>
                    <Iconfont name={isList ? 'xingzhuang3' : 'caidan'} size={20} color={'#fff'}/>
                </TouchableOpacity>

            </View>
        </View>
        <TabBasic
            tabs={title}
            onChange={changeTab}
        >
            {showMore ? <MonitorData/> : isList ? <EquipList data={dataList}/> : <EquipCard data={dataList}/>}
            {isList ? <EquipStatusList data={dataList}/> : <EquipStatusCard data={dataList}/>}
        </TabBasic>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F6F7',
    },
    right: {
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    searchWrapper: {
        flexDirection: 'row',
        backgroundColor: '#132E7D',
        height: 40,
        paddingRight: 10,
    },
    search: {
        flex: 1,
        marginLeft: '4%',
    },
    searchInput: {},
    searchName: {
        color: '#fff',
    },
    searchIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 60,
    },
    lineStyle: {
        marginBottom: 2,
        backgroundColor: '#fff',
    },
    tabItem: {
        flex: 1,
    },

});

export default EquipTab;
