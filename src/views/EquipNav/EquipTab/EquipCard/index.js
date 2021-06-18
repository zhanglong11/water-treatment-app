import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CommonStyle from '../../../Common/commonCss';
import ValueChart from '../../../components/ChartBasic/ValueChart';

const EquipCard = props => {
    const [dataList, setDataList] = useState(props.data);
    const [threeData, setThreeData] = useState([]);
    const [chartIndex, setChartIndex] = useState(null);
    const [itemIndex, setItemIndex] = useState(null);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        initData();
        if (chartIndex !== null) {
            initThreeData();
        }
    }, [chartIndex, chartData]);

    const initData = () => {
        let threeList = dataList.reduce((acc, cur) => {
            if (!acc.length) {
                return [[cur]];
            } else {
                if (acc[acc.length - 1].length != 3) {
                    let len = acc[acc.length - 1];
                    acc.pop();
                    return [...acc, [...len, cur]];
                } else {
                    return [...acc, [cur]];
                }
            }
        }, []);
        setThreeData(threeList);
    };

    const renderThreeItem = () => {
        return threeData.map((item, i) => <View style={styles.list}>
            {renderData(item, i)}
        </View>);
    };

    const initThreeData = () => {
        let data = threeData.filter(t => t instanceof Array);
        if (chartIndex && chartIndex > 0) {
            data.splice(chartIndex, 0, chartData);
        }
        setThreeData([...data]);
    };

    const showChart = (listIndex, i, d) => {
        if (listIndex === chartIndex && i === itemIndex) {
            setChartIndex(-1);
            setItemIndex(-1);
        } else {
            setChartIndex(chartIndex !== -1 && chartIndex != null && listIndex > chartIndex ? listIndex - 1 : listIndex);
            setItemIndex(i);
            setChartData({...d, ...{isChart: true}});
        }
    };


    const renderData = (item, listIndex) => {
        if (!item.isChart) {
            return item.map((d, i) => {
                return <TouchableOpacity
                    style={{
                        ...styles.item, ...{
                            marginLeft: i === 1 ? '2%' : 0, marginRight: i === 1 ? '2%' : 0,
                            backgroundColor: listIndex === chartIndex-1 && i === itemIndex ? '#eee' : '#fff',
                        },
                    }} key={d.id}
                    onPress={() => {
                        showChart(listIndex + 1, i, d);
                    }}
                >
                    {d.status === 1 ? <Image
                        style={styles.img}
                        source={require(`../../../../assets/images/equipR.png`)}
                        resizeMode='contain'
                    /> : <Image
                        style={styles.img}
                        source={require(`../../../../assets/images/equipB.png`)}
                        resizeMode='contain'
                    />}
                    <Text numberOfLines={1}>{d.name}</Text>
                    <View style={styles.dec}>
                        <Text style={styles.total}>{d.total}</Text>
                        <Text style={styles.unit}>{d.unit}</Text>
                    </View>
                </TouchableOpacity>;
            });
        } else {
            return <View style={styles.chartWrapper}>
                <Text>{chartData.name}</Text>
                <View style={styles.chart}>
                    <ValueChart/>
                </View>
            </View>;
        }
    };

    return (<ScrollView style={styles.wrapper}>
        {renderThreeItem()}
    </ScrollView>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F6F7',
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: '2%',
    },
    item: {
        width: '32%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        ...CommonStyle.shadow,
    },
    img: {
        width: 50,
        height: 50,
        marginBottom: 4,
    },
    dec: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    total: {
        color: '#aaa',
    },
    unit: {
        marginLeft: 10,
        color: '#aaa',
    },
    chartWrapper: {
        width: '100%',
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10,
    },
    chart: {
        flex: 1,
        height: 100,
    },
});

export default EquipCard;
