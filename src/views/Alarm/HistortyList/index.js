import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {SwipeAction, DatePicker, Modal, Button, Toast} from '@ant-design/react-native';
import Iconfont from '../../components/IconBasic';
import moment from 'moment';
import * as sysService from '../../../service/sysService';


const HistroyList = props => {
    const [dataList, setDataList] = useState([]);
    const [dateSort, setDateSort] = useState(null);
    const [visible, setVisible] = useState(false);
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

    const [queryStartDate, setQueryStartDate] = useState(null);
    const [queryEndDate, setQueryEndDate] = useState(null);
    useEffect(() => {
        getData();
    }, [queryStartDate, queryEndDate]);

    useEffect(() => {
        if (dateSort !== null) {
            sortData();
        }
    }, [dateSort]);


    const getData = () => {
        sysService.alarmHisList({queryStartDate,queryEndDate}).then(res => {
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
        setDataList([...dataList]);
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

    const searchData = () => {
        setQueryEndDate(endDate);
        setQueryStartDate(startDate);
        setVisible(false);
    };

    const sortDate = () => {
        setDateSort(!dateSort);
    };

    const goInfo = (id) => {
        props.navigation.push('AlarmInfo', {id, isHis: true});
    };


    const renderList = () => {
        return dataList.length ? dataList.map(d => {
            return <SwipeAction
                style={{backgroundColor: 'transparent'}}
                autoClose
                right={renderRight(d.id)}
                key={d.id}
            >
                <TouchableOpacity onPress={() => {
                    goInfo(d.id);
                }}>
                    <View style={styles.item}>
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
                            <Iconfont name={'arrow'} size={20} color={'#8C8C8C'}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </SwipeAction>;
        }) : null;
    };


    return (<View style={styles.wrapper}>
        <View style={styles.queryWrapper}>
            <TouchableOpacity
                onPress={() => {
                    setVisible(!visible);
                }}
                style={styles.queryNav}
            >
                <Text style={styles.queryText}>
                    查询时间
                </Text>
                <Iconfont style={styles.icon} name={visible ? 'arrowup' : 'arrowdown-copy'} size={16}/>
            </TouchableOpacity>
        </View>
        <View
            style={{
                position: 'absolute',
                top: 30,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#4d4d4d',
                opacity: visible ? 0.5 : 0,
                zIndex: visible ? 222 : -1,
            }}>
        </View>
        <View style={{
            position: 'absolute',
            top: 30,
            left: 0,
            right: 0,
            zIndex: visible ? 2222 : -2,
            opacity: visible ? 1 : 0,
            backgroundColor: '#fff',
        }}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalDate}>
                    <DatePicker
                        value={startDate ? new Date(startDate) : ''}
                        mode="date"
                        onChange={val => {
                            setStartDate(moment(val).format('YYYY-MM-DD'));
                        }}
                        format="YYYY-MM-DD"
                        maxDate={endDate ? new Date(endDate) : undefined}
                    >
                        <TouchableOpacity
                            onPress={this.show}
                            activeOpacity={0.5}
                            underlayColor="#a9d9d4">
                            <Text style={styles.date}>
                                {startDate}
                            </Text>
                        </TouchableOpacity>
                    </DatePicker>
                    <Text style={styles.line}>--</Text>
                    <DatePicker
                        value={endDate ? new Date(endDate) : ''}
                        mode="date"
                        format="YYYY-MM-DD"
                        onChange={val => {
                            setEndDate(moment(val).format('YYYY-MM-DD'));
                        }}
                        minDate={startDate ? new Date(startDate) : undefined}
                    >
                        <TouchableOpacity
                            onPress={this.show}
                            activeOpacity={0.5}

                            underlayColor="#a9d9d4">
                            <Text style={styles.date}>
                                {endDate}
                            </Text>
                        </TouchableOpacity>
                    </DatePicker>
                </View>
                <Button style={styles.btn} activeStyle={styles.activeBtn} type="warning" size={'small'}
                        onPress={searchData}>
                    查询
                </Button>
            </View>
        </View>
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
    queryNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 30,
    },
    queryText: {
        color: '#8E8E8E',
    },
    modalWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    modalDate: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    date: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: '#8E8E8E',
        backgroundColor: '#eee',
        borderWidth: 0,
        borderRadius: 14,
    },
    line: {
        color: '#8E8E8E',
        paddingTop: 4,
    },
    btn: {
        width: 60,
        height: 30,
        backgroundColor: '#132E7D',
        borderWidth: 0,
        borderRadius: 6,
    },
    activeBtn: {
        backgroundColor: '#132E7D',
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

export default HistroyList;
