import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TouchableNativeFeedback} from 'react-native';
import {SwipeAction, Toast} from '@ant-design/react-native';
import Iconfont from '../../components/IconBasic';
import * as sysService from '../../../service/sysService';


const data = [
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2018-09-14', id: 1},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2019-09-14', id: 2},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2018-09-14', id: 3},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2014-09-14', id: 4},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2018-09-14', id: 5},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 6},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 7},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 8},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 9},
    {name: '一个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 10},
    {name: '二个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 11},
    {name: '二个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 12},
    {name: '二个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 13},
    {name: '八个和尚挑水喝一个和尚挑水喝一个和尚挑水喝', date: '2017-09-14', id: 14},
];

const List = props => {
    const [dataList, setDataList] = useState([]);
    const [dateSort, setDateSort] = useState(null);

    useEffect(() => {
        getData();
        if (dateSort !== null) {
            sortData();
        }
    }, [dateSort]);

    const getData = () => {
        sysService.alarmList({}).then(res => {
            if (!res.flag) {
                return;
            }
            setDataList(res.data);
        });
    };

    const delData = id => {
        sysService.alarmDel({id}, {}).then(res => {
            if (!res.flag) {
                Toast.fail(res.msg);
                return;
            }
            Toast.success(res.msg);
            getData();
        });
    };


    const sortData = () => {
        if (dateSort) {
            dataList.sort((a, b) => {
                return a.alertTime.localeCompare(b.alertTime);
            });
        } else {
            dataList.sort((a, b) => {
                return b.alertTime.localeCompare(a.alertTime);
            });
        }
    };

    const renderRight = (id) => {
        return [{
            text: '删除',
            onPress: () => {
                delData(id);
            },
            style: {backgroundColor: 'red', color: 'white'},
        }];
    };

    const goInfo = (id) => {
        props.navigation.push('AlarmInfo', {id});
    };

    const renderList = () => {
        return dataList.length ? dataList.map(d => {
            return <SwipeAction
                style={{backgroundColor: 'transparent'}}
                autoClose
                right={renderRight(d.id)}
                key={d.id}
            >
                <TouchableOpacity style={styles.item} onPress={() => {
                    goInfo(d.id);
                }}>
                    <View style={styles.nameWrapper}>
                        {d.status === 1 ? <Image
                            style={styles.img}
                            source={require(`../../../assets/images/equipR.png`)}
                            resizeMode='contain'
                        /> : <Image
                            style={styles.img}
                            source={require(`../../../assets/images/equipB.png`)}
                            resizeMode='contain'
                        />}
                        <Text numberOfLines={1} style={styles.tdDate}>{d.alertTime}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.tdName}>{d.alertName}</Text>
                    <View style={styles.arrow}>
                        <Iconfont name={'arrow'} size={20} color={'#B5B5B5'}/>
                    </View>
                </TouchableOpacity>
            </SwipeAction>;
        }) : null;
    };

    const sortDate = () => {
        setDateSort(!dateSort);
    };

    return (<View style={styles.wrapper}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerDate} onPress={sortDate}>
                <Text style={styles.headerText}>报警时间</Text>
                <Iconfont style={styles.icon} name={dateSort ? 'arrowup' : 'arrowdown-copy'} size={16}/>
            </TouchableOpacity>
            <View style={styles.headerName}>
                <Text style={styles.headerText}>名称</Text>
            </View>
        </View>
        <ScrollView>
            {renderList()}
        </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F6F7',
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#eee',
    },
    headerText: {
        color: '#909090',
    },
    headerDate: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerName: {
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        marginLeft: 6,
        color: '#909090',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 4,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    nameWrapper: {
        width: 180,
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 30,
        height: 30,
    },
    tdDate: {
        flex: 1,
        marginLeft: 6,
        color: '#5F5F5F',
    },
    tdName: {
        flex: 1,
        color: '#5F5F5F',
    },
    arrow: {
        width: 30,
    },
});

export default List;
