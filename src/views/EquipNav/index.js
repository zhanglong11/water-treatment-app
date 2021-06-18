import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import Header from '../components/Header';
import MapBasic from '../components/MapBasic';
import SearchBar from '../components/SearchBar';
import Iconfont from '../components/IconBasic';
import TabBasic from '../components/TabBasic';
import StyleBasic from '../components/StyleBasic';
import * as sysService from '../../service/sysService';

const status = ['', '#3554E3', '#FFB139', '#FF5B53'];


const marker = [
    {
        name: '煤矿水处理1', desp: '煤矿水处理1', status: 0, latitude: 39.826901, longitude: 116.377972,
    },
    {
        name: '煤矿水处理2', desp: '煤矿水处理2', status: 1, latitude: 39.886901, longitude: 116.317972,
    },
];

const EquipNav = props => {
    const [listData, setListData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [markerData, setMarkerData] = useState(marker);
    const [curTitle, setCurTitle] = useState(0);
    const [projectName,setProjectName]=useState('');

    useEffect(() => {
        getData();
    }, [projectName]);

    useEffect(() => {
        // console.log(listData)
        // initData();
    }, [showData]);

    useEffect(()=>{
        mapData();
    },[listData])


    const getData = () => {
        sysService.equipList({projectName}).then(res => {
            if (!res.flag) {
                return;
            }
            setListData(res.data);
            setShowData(res.data);
        })
    };

    const mapData=()=>{

    }

    const initData = () => {
        console.log(listData);
        const projectShowId = global.projectShowId;
        const projectSort = global.projectSort;
        const detailData = global.detailShowId || {};
        if (projectSort !== null) {
            if (projectSort) {
                listData.sort((a, b) => {
                    return b.projectName.localeCompare(a.projectName);
                });
            } else {
                listData.sort((a, b) => {
                    return a.projectName.localeCompare(b.projectName);
                });
            }
        }
        console.log(listData);
        console.log(showData);

        let dataArray = [...listData];
        if (projectShowId && projectShowId.length) {
            dataArray = listData.filter(l => projectShowId.includes(l.projectId));
        }
        dataArray.map(d => {
            if (Object.keys(detailData).includes(d.id)) {
                d.showDetail = d.pointConfigList.filter(de => detailData[d.id].includes(de.id));
            } else {
                d.showDetail = d.pointConfigList.filter((de, i) => i < 3);
            }
        });
        setShowData([...dataArray]);
    };


    const tabTitle = [
        {title: '项目导航'},
        {title: '项目地图'},
    ];

    const changeTab = (item, i) => {
        setCurTitle(i);
    };

    const goList = (name) => {
        props.navigation.push('EquipTab', {name});
    };

    const chooseProject = () => {
        props.navigation.push('EquipChooseProject', {listData, refresh: initData});
    };

    const detailSet = (id) => {
        props.navigation.push('EquipChooseItem', {
            id,
            listData: listData.filter(l => l.projectId === id)[0].showDetail,
            refresh: initData,
        });
    };


    const right = <View style={styles.right}>
        {curTitle ? null : <Iconfont name={'add'} onPress={chooseProject} size={22} color={'#fff'}/>}
    </View>;

    const renderList = (l) => {
        return <TouchableOpacity
            onPress={() => {
                goList(l.projectName);
            }}
            key={l.projectId}
        >
            <View style={styles.card} key={l.projectId}>
                <View style={styles.head}>
                    <View style={styles.title}>
                        <Text numberOfLines={1} style={styles.name}>{l.projectName}</Text>
                        {l.status == 1 || l.status == 2
                            ? <View style={styles.avatarStatus}>
                                <Text style={styles.statusText}>{l.projectStatus == 1 ? '故障' : '告警'}</Text>
                            </View> : null
                        }
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/images/trouble.png')}
                        />
                    </View>
                </View>
                <View style={styles.list}>
                    <TouchableOpacity style={styles.detailIcon} onPress={() => {
                        detailSet(l.projectId);
                    }}>
                        <Iconfont name={'caidan1'} size={20} color={'#aaa'}/>
                    </TouchableOpacity>
                    {l.showDetail?l.showDetail.map((d, i) => (<View style={styles.item} key={i}>
                        <View style={{...styles.status, ...{backgroundColor: status[d.status]}}}/>
                        <Text numberOfLines={1} style={styles.detailName}>{d.name}</Text>
                        <Text style={styles.detailNum}>{d.currentValue}</Text>
                        <Text style={styles.detailUnit}>{d.unit}</Text>
                    </View>)):null}
                </View>
            </View>
        </TouchableOpacity>;
    };

    return <View style={styles.wrapper}>
        <Header title={'设备导航'} right={right}/>
        <View style={styles.searchWrapper}>
            <SearchBar
                placeholder={'输入项目名称'}
                placeholderTextColor={'#8C98B7'}
                style={styles.searchInput}
                query={setProjectName}
            />
        </View>
        <TabBasic
            tabs={tabTitle}
            onChange={changeTab}
        >
            <FlatList
                style={{flex: 1}}
                data={showData}
                renderItem={({item}) => renderList(item)}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.tabItem}>
                <MapBasic markerData={markerData}/>
            </View>
        </TabBasic>
    </View>;
};

const styles = StyleSheet.create({
    wrapper: {
        ...StyleBasic.wrapper,
    },
    right: {
        width: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    searchWrapper: {
        backgroundColor: '#132E7D',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    searchInput: {},
    tabItem: {
        flex: 1,
    },
    mapWrapper: {
        width: 500,
        height: 100,
    },
    card: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#fff',
        ...StyleBasic.shadow,
    },
    head: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 60,
        height: 60,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    avatarStatus: {
        width: 28,
        marginLeft: 4,
        paddingHorizontal: 2,
        color: '#FF5B53',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FF5B53',
    },
    statusText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FF5B53',
    },
    list: {
        width: '65%',
        paddingLeft: 10,
    },
    detailIcon: {
        alignItems: 'flex-end',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '6%',
        paddingRight: '10%',
    },
    status: {
        width: 8,
        height: 8,
        borderRadius: 8,
    },
    detailName: {
        width: '50%',
        marginLeft: 10,
        color: '#595959',
    },
    detailNum: {
        width: '20%',
        color: '#7E7E7E',
    },
    detailUnit: {
        width: '20%',
        color: '#8E8E8E',
    },
});

export default EquipNav;

